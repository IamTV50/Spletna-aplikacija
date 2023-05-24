const logModel = require('../models/logModel.js');
var LogModel = require('../models/logModel.js');
const userModel=require('../models/userModel.js')

const { ObjectId } = require('mongodb');

module.exports = {

    list: function(req, res){
        LogModel.find(function (err,logs){
            if (err){
                return res.status(500).json({
                    message: 'Error when getting logs',
                    error: err
                });
            }
            var data = [];
            data.logs = logs;
            return res.json(logs);
        })
    },

    show: function (req, res) {
        var id = req.params.id;

        LogModel.findOne({_id: id}, function (err, log) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting log.',
                    error: err
                });
            }

            if (!log) {
                return res.status(404).json({
                    message: 'No such log'
                });
            }

            return res.json(log);
        });
    },

    create: function (req, res) {
        var log = new LogModel({
			user : req.body.user,
			opend : req.body.opend,
            user_id: req.session.userId,
            boxId: req.body.boxId
        });

        log.save(function (err, log) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating log',
                    error: err
                });
            }

            return res.status(201).json(log);
        });
    },

    update: function (req, res) {
        var id = req.params.id;

        LogModel.findOne({_id: id}, function (err, log) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting log ',
                    error: err
                });
            }

            if (!log) {
                return res.status(404).json({
                    message: 'No such log'
                });
            }

            log.user = req.body.user ? req.body.user : log.name;
            log.date = req.body.date ? req.body.date : log.date;

            
            log.save(function (err, log) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating log.',
                        error: err
                    });
                }

                return res.json(log);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;

        LogModel.findByIdAndRemove(id, function (err, log) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the log.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    myLogs: function (req, res) {
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
          LogModel.find({ "user_id": neke }, function (err, logs) {
            if (err) {
              return res.status(500).json({
                message: 'Error when getting boxes.',
                error: err
              });
            }
      
            obj = {};
            logged_in = !(req.session && typeof req.session.userId === 'undefined');
            obj.logged_in = logged_in;
            obj.logs = logs;
      
            return res.json(logs);
          });
        });
      },

}