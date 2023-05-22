const boxModel = require('../models/boxModel.js');
var BoxModel = require('../models/boxModel.js');
var userModel = require("../models/userModel.js")

const { ObjectId } = require('mongodb');

module.exports = {

    list: function(req, res){
        BoxModel.find(function (err,boxes){
            if (err){
                return res.status(500).json({
                    message: 'Error when getting box ',
                    error: err
                });
            }
            var data = [];
            data.boxes = boxes;
            return res.json(boxes);
        })
    },

    show: function (req, res) {
        var id = req.params.id;

        BoxModel.findOne({_id: id}, function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting box.',
                    error: err
                });
            }

            if (!box) {
                return res.status(404).json({
                    message: 'No such box'
                });
            }

            return res.json(box);
        });
    },

    create: function (req, res) {
        var box = new BoxModel({
			name : req.body.name,
			boxId : req.body.boxId,
            user_id: req.session.userId
        });

        box.save(function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating box',
                    error: err
                });
            }

            return res.status(201).json(box);
        });
    },
    myBoxes: function (req, res) {
        var username = req.params.username
        //var username = Cookies.get("uporabnik"); // Retrieve the username from the cookie
       // var neke = new ObjectId(username);
        console.log(username)
        // Find the user by username and retrieve the user ID
        userModel.findOne({ "username": username }, function (err, user) {
            console.log(err)
          if (err) {
            return res.status(500).json({
              message: 'Error when finding user.',
              error: err
            });
          }
          if (!user) {
            return res.status(404).json({
              message: 'User not found.'
            });
          }
      
          
        var user_id = user._id;
        var neke = new ObjectId(user_id);
        
      
          // Use the retrieved user_id in your query
          boxModel.find({ "user_id": neke }, function (err, boxes) {
            if (err) {
              return res.status(500).json({
                message: 'Error when getting boxes.',
                error: err
              });
            }
      
            obj = {};
            logged_in = !(req.session && typeof req.session.userId === 'undefined');
            obj.logged_in = logged_in;
            obj.boxes = boxes;
      
            return res.json(boxes);
          });
        });
      },
      
    update: function (req, res) {
        var id = req.params.id;

        BoxModel.findOne({_id: id}, function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting box',
                    error: err
                });
            }

            if (!box) {
                return res.status(404).json({
                    message: 'No such box'
                });
            }

            box.name = req.body.name ? req.body.name : box.name;
			box.boxID = req.body.boxID ? req.body.boxID : box.boxID;
			
            box.save(function (err, box) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating box.',
                        error: err
                    });
                }

                return res.json(box);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        
        

        BoxModel.findByIdAndRemove(id, function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the box.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
}