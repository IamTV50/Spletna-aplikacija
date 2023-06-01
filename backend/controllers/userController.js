var UserModel = require('../models/userModel.js');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var user = req.params.username;
        UserModel.findOne({ "username": user }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });

    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            admin: req.body.admin
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
            //return res.redirect('/users/login');
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;
            user.email = req.body.email ? req.body.email : user.email;
            user.admin = req.body.admin ? req.body.admin : user.admin;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    showRegister: function (req, res) {
        res.render('user/register');
    },

    showLogin: function (req, res) {
        res.render('user/login');
    },

    login: function (req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function (err, user) {
            if (err || !user) {
                var err = new Error('Wrong username or paassword');
                err.status = 401;
                return next(err);
            }
            req.session.userId = user._id;
            //res.redirect('/users/profile');
            return res.json(user);
        });
    },

    profile: function (req, res, next) {
        UserModel.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        var err = new Error('Not authorized, go back!');
                        err.status = 400;
                        return next(err);
                    } else {
                        //return res.render('user/profile', user);
                        return res.json(user);
                    }
                }
            });
    },

    logout: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    //return res.redirect('/');
                    return res.status(201).json({});
                }
            });
        }
    },
    register: async function (req, res) {
        try {
            var id = req.params.id;
    
            var user = new UserModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                images: req.body.images
            });
    
            await user.save();
    
            // Assuming req.body.images is an array of { data: Buffer, contentType: String }
            
            // Import the necessary modules
            const fs = require('fs');
            const path = require('path');
    
            // Save pictures to files
            const images = req.body.images;
            const savePromises = [];
            images.forEach((imageData, index) => {
                // Create a unique filename for each picture
                const filename = `picture_${index}.png`;
                // Get the image data and content type
                const { data, contentType } = imageData;
                // Define the file path to save the picture
                const filePath = path.join(__dirname, '../user_ pictures', filename);
                
                // Create a promise to save the picture
                const savePromise = new Promise((resolve, reject) => {
                    // Save the picture to file
                    fs.writeFile(filePath, data, 'base64', (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
    
                // Add the promise to the array
                savePromises.push(savePromise);
            });
    
            // Wait for all the pictures to be saved
            await Promise.all(savePromises);
            console.log("kurba");
            // Execute Python script
            exec(`python python-scripts/addUser.py ${id}`, async (error, stdout, stderr) => {
                if (error) {
                    // Error occurred during script execution
                    return res.status(500).json({
                        message: 'Error when executing Python script',
                        error: error.message
                    });
                }
    
                // Delete pictures files
                try {
                    for (const image of images) {
                        await unlink(image.path);
                    }
                } catch (err) {
                    return res.status(500).json({
                        message: 'Error when deleting pictures',
                        error: err
                    });
                }
    
                // Successful script execution and deletion of pictures
                return res.status(201).json(user);
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }
    },

    loginFace : async function (req, res){

    }
}
