var BoxModel = require('../models/boxModel.js');

module.exports = {

    list: function(req, res){
        BoxModel.find(function (err,boxes){
            if (err){
                return res.status(500).json({
                    message: 'Error when getting box',
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
			boxId : req.body.boxId
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