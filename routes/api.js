const express = require('express');
const router = express.Router();
const axios = require('axios');
const mockUserData = require('../mock/mock_users');

const slackUserListEndpoint = 'https://slack.com/api/users.list';
const slackToken = process.env.SLACK_TOKEN;

// Endpoint to lookup a slack user ID based on username
// Test example: api/getSlackUserId?username=kevinmbruland 
// TODO: Verify the slack app API really can't lookup user info by username?
router.get('/getSlackUserId', function (req, res, next) {

  const reqName = req.query.username;

  if (reqName) {
    axios.get(slackUserListEndpoint + '?token=' + slackToken)
      .then(function (slackReq) {
        const slackMembers = slackReq.data.members;
        for (let i = 0; i < slackMembers.length; i++) {
          if (reqName === slackMembers[i].name) {
            return res.json({ slackId: slackMembers[i].id });
          }
        }
        res.json({ error: 'No slack username, ' + reqName + ', found' });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    res.json(
      { error: 'No name value provided' }
    )
  }
});

router.post('/addNewUser', function (req, res, next) {
  if (req.body.username) {
    for (let i = 0; i < mockUserData.length; i++) {
      if (req.body.username === mockUserData[i].name) {
        res.json({ userNotification: 'Username already exists!' });
        return res.end();
      }
    }
    res.json({userNotification: 'User successfully added!'});
    res.end();
  }
});

module.exports = router;