var express = require('express');

var router = express.Router();
var boxController = require('../controllers/boxController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/',boxController.list);
router.get('/showBox/:id', boxController.show);
//router.get('/:id', requiresLogin, boxController.myBoxes);

router.get('/my_boxes/:username', boxController.myBoxes);

router.post('/', requiresLogin,  boxController.create);

router.put('/:id', boxController.update);

router.delete('/:id', boxController.remove);

module.exports = router;