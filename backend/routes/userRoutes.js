var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');


router.get('/lista', userController.list);
//router.get('/register', userController.showRegister);
//router.get('/login', userController.showLogin);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
router.get('/:username/user', userController.show);

router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/register', userController.register);

router.put('/:id/edit', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
