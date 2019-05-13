const express = require('express');
const router = express.Router();
const axios = require('axios');
const mockUserData = require('../mock/mock_users');
const usersController = require('../controllers/usersController');

const slackUserListEndpoint = 'https://slack.com/api/users.list';
const slackToken = process.env.SLACK_TOKEN;

router.get('/testRoute', usersController.test);

router.get('/users', usersController.getUsers);

router.get('/users/:username', usersController.getUser);

module.exports = router;