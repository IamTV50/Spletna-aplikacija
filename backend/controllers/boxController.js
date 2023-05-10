const boxModel = require('../models/boxModel.js');
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
            var user_id=req.session.userId
            console.log(user_id)
            boxModel.find({'user_id': user_id},function (err, boxes) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting question.',
                        error: err
                    });
                }
                obj={}
                logged_in = !(req.session  && typeof req.session.userId === 'undefined')
                obj.logged_in=logged_in;
                obj.boxes=boxes;
                return res.json(boxes);
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