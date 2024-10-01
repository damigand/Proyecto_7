const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const { isAuth } = require('../../middlewares/auth');

router.get('/', controller.getAllUsers);

router.get('/:id', controller.getUserById);

router.get('/name/:username', controller.getUserByUsername);

router.post('/create', controller.createUser);

router.post('/login', controller.loginUser);

router.put('/edit/:id', isAuth, controller.editUser);

router.delete('/delete/:id', isAuth, controller.deleteUser);

module.exports = router;
