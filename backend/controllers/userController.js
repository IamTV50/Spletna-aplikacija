var UserModel = require('../models/userModel.js');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const path = require('path');
const unlink = util.promisify(fs.unlink);
const multer = require('multer');

const { compress, decompress } = require('../utils/compressionUtils.js');
const AdmZip = require('adm-zip');
const { type } = require('os');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './user_pictures'); // Specify the destination directory for saving the files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `user_${req.params.username}_${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, filename); // Set the filename for the uploaded file
    }
  });
const upload = multer({ storage }).array('images', 30);
  

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
        // Call the upload middleware
        await new Promise((resolve, reject) => {
          upload(req, res, (err) => {
            if (err) {
              console.error('Error in upload middleware:', err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      
        var id = req.params.username;
        var pythonScriptPath = 'python-scripts/addUser.py';
        // Execute Python script
        exec(`python ${pythonScriptPath} ${id}`, async (error, stdout, stderr) => {
            if (error) {
                // Handle error
                console.error('Error when executing Python script:', error);
                return;
            }
            // Handle script execution success
            console.log('Python script executed successfully');
            console.log('Python script output:', stdout);
        });
        
          setTimeout(() => {
            const pictures = req.files;

            // decompress file back to picture?

            pictures.forEach((picture) => {
              // Delete the specific picture file
              fs.unlinkSync(picture.path);
            });
            return res.status(201).json({ message: 'Registration successful' });
          }, 60000);
        },

    loginFace: async function (req, res) {
        try {
            
            // Testing code for compressed data
            if (!req.body.compressedDataArray) { // "compressedDataArray" MUST ME NAMED SAME AS IN FaceLoginRequest.kt
                return res.status(400).json({ error: 'No compressed data received' });
            }
    
            console.log('doing stuff');

            console.log('data:', req.body.compressedDataArray);

            // 1. Convert the received integer array to a character array
            const charArray = req.body.compressedDataArray.map(num => String.fromCharCode(num));

            // 2. Convert the character array to a string
            const compressedString = charArray.join('');
            console.log('Compressed string:', compressedString);

            // 3. Decompress the string using the decompress function
            const decompressedArray = decompress(compressedString);
            console.log('Decompressed array:', decompressedArray);

            // 4. Convert the decompressed number array to a base64 string
            const base64String = decompressedArray.map(num => String.fromCharCode(num)).join('');
            console.log('Base64 string:', base64String);

            // 5. Convert the base64 string to a zip buffer
            const zipBuffer = Buffer.from(base64String, 'base64');

            // 6. Extract the zip buffer to the user_pictures directory
            const userPicturesDir = path.join(__dirname, '../user_pictures');
            if (!fs.existsSync(userPicturesDir)) {
                fs.mkdirSync(userPicturesDir);
            }

            const tempZipPath = path.join(userPicturesDir, 'temp.zip');
            fs.writeFileSync(tempZipPath, zipBuffer);

            const zip = new AdmZip(tempZipPath);
            const userDir = path.join(userPicturesDir, req.params.username);

            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir);
            }

            zip.extractAllTo(userDir, true);

            // Cleanup
            fs.unlinkSync(tempZipPath);

            console.log("Images extracted to:", userPicturesDir);


            return res.status(201).json({ message: 'Face login TEST success' });

            // Call the upload middleware
            await new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err) {
                        console.error('Error in upload middleware:', err); // Log the error
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            var id = req.params.username;
            console.log(id);
            var pythonScriptPath = 'python-scripts/isUser.py';
            const timeoutDuration = 60000; 
            clearTimeout(timeoutDuration);
            // Execute Python script
            exec(`python ${pythonScriptPath} ${id}`, async (error, stdout, stderr) => {
                if (error) {
                    // Error occurred during script execution
                    // Handle error
                    console.error('Error when executing Python script:', error);
                    return;
                }
                console.log('Python script executed successfully');
                console.log('Python script output:', stdout);
                const pictures = req.files;
                pictures.forEach((picture) => {
                  // Delete the specific picture file
                  fs.unlinkSync(picture.path);
                });
                

                // Successful script execution and deletion of pictures
                return res.status(201).json({message: 'Face login success '});
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error when logging in with face',
                error: err
            });
        }
      },

    
}
