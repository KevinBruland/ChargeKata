const express = require('express');
const router = express.Router();
const mockUserData = require('../mock/mock_users');

router.get('/', function (req, res, next) {
    res.render('users', { users: mockUserData });
});

module.exports = router;