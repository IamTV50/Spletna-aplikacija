const logModel = require('../models/logModel.js');
var LogModel = require('../models/logModel.js');

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
        var log = new BoxModel({
			user : req.body.user,
			opend : req.body.opend,
            user_id: req.session.userId
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

}