var UserModel = require('../models/userModel.js');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const path = require('path');
const unlink = util.promisify(fs.unlink);
const multer = require('multer');

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
          console.log(req.body.username);
          await user.save();
    
          // Set up multer storage
          const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, path.join(__dirname, '../user_pictures'));
            },
            filename: function (req, file, cb) {
              cb(null, `picture_${Date.now()}_${file.originalname}`);
            }
          });
    
          // Create multer upload middleware
          const upload = multer({ storage: storage }).array('images', 5);
    
          // Use the upload middleware to handle file uploads
          upload(req, res, async function (err) {
            if (err) {
              return res.status(500).json({
                message: 'Error when uploading pictures',
                error: err
              });
            }
    
            // Assuming req.files is an array of uploaded files
    
            // Execute Python script
            exec(`python python-scripts/addUser.py ${id}`, async (error, stdout, stderr) => {
              if (error) {
                // Error occurred during script execution
                return res.status(500).json({
                  message: 'Error when executing Python script',
                  error: error.message
                });
              }
    
              // Delete picture files
              try {
                for (const file of req.files) {
                  await unlink(file.path);
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
          });
        } catch (err) {
          return res.status(500).json({
            message: 'Error when creating user',
            error: err
          });
        }
    },
      

    loginFace : async function (req, res){
            try {
                var id = req.params.id;
                var image = req.body.image;
                console.log(id);
                console.log(image);
                // Assuming req.body.image is a { data: Buffer, contentType: String } object
        
                // Import the necessary modules
                const fs = require('fs');
                const path = require('path');
        
                // Save the face image to a file
                const filename = 'face_image.png';
                const filePath = path.join(__dirname, '../face_images', filename);
                const { data, contentType } = image;
                
                await fs.promises.writeFile(filePath, data, 'base64');
        
                // Execute Python script
                exec(`python python-scripts/isUser.py ${id}`, async (error, stdout, stderr) => {
                    if (error) {
                        // Error occurred during script execution
                        return res.status(500).json({
                            message: 'Error when executing Python script',
                            error: error.message
                        });
                    }
        
                    // Read the output file generated by the Python script
                    const outputFile = path.join(__dirname, '../output.txt');
                    const outputData = await fs.promises.readFile(outputFile, 'utf8');
        
                    // Delete the face image file
                    await fs.promises.unlink(filePath);
        
                    // Delete the output file
                    await fs.promises.unlink(outputFile);
        
                    // Parse the output data
                    const result = JSON.parse(outputData);
        
                    // Check if the user is authenticated
                    if (result.authenticated) {
                        return res.status(200).json({ message: 'User authenticated', user: result.user });
                    } else {
                        return res.status(401).json({ message: 'User not authenticated' });
                    }
                });
            } catch (err) {
                return res.status(500).json({
                    message: 'Error when logging in with face recognition',
                    error: err
                });
            }
        }
        
        
    
}
