const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getUsers);

router.get('/users/:username', usersController.getUser);

module.exports = router;