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
        var username = req.params.username;

        userModel.findOne({ "username": username }, function (err, user) {
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
        
          boxModel.find({ "user_id": { $in: [user_id] } }, function (err, boxes) {
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
      
        BoxModel.findOne({ _id: id }, function (err, box) {
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
          box.boxId = req.body.boxId ? req.body.boxId : box.boxId;
      
          // Update user_id array if user IDs are provided in the request body
          if (req.body.userIds && Array.isArray(req.body.userIds)) {
            box.user_id.push(...req.body.userIds);
          }
      
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