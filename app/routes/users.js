const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.usersHome);

router.get('/newUser', usersController.newUserPage);

router.post('/newUser', usersController.registerNewUser)

module.exports = router;