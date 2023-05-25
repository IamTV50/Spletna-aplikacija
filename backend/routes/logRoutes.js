var express = require('express');

var router = express.Router();
var logController = require('../controllers/logController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    }else{
        var err = new Error("You must be looged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/',logController.list);
router.get('/showBox/:id', logController.show);
router.get('/my_logs/:username', logController.myLogs);

router.post('/',  logController.create);

router.put('/:id', logController.update);

router.delete('/:id', logController.remove);

module.exports = router;