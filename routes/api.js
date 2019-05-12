const express = require('express');
const router = express.Router();
const axios = require('axios');
const mockUserData = require('../mock/mock_users');

const slackUserListEndpoint = 'https://slack.com/api/users.list';
const slackToken = process.env.SLACK_TOKEN;

// Endpoint to lookup a slack user ID based on username
// Test example: api/getSlackUserId?username=kevinmbruland 
// TODO: Verify the slack app API really can't lookup user info by username?

function checkSlackUsername(slackUsername) {
  return axios.get(slackUserListEndpoint + '?token=' + slackToken)
    .then(function (res) {
      const slackMembers = res.data.members;
      for (let i = 0; i < slackMembers.length; i++) {
        if (slackUsername === slackMembers[i].name) {
          return slackMembers[i];
        }
      }
      return null;
    })
    .catch(function (err) {
      console.log(err);
    });
}

router.get('/getSlackUserId', function (req, res, next) {
  const reqName = req.query.username;

  if (reqName) {
    checkSlackUsername(reqName).then(function (slackUserInfo) {
      if (slackUserInfo) {
        res.json({ slackId: slackUserInfo.id });
      } else {
        res.json({ error: 'No slack username, ' + reqName + ', found' });
      }
      res.end();
    });
  } else {
    res.json({ error: 'No username provided' });
    res.end();
  }
});

function checkIfUserExists(name) {
  for (let i = 0; i < mockUserData.length; i++) {
    if (name === mockUserData[i].name) {
      return mockUserData[i];
    }
  }
  return null;
}

function checkIfPlatformUserExists(platformName, username) {
  for (let i = 0; i < mockUserData.length; i++) {
    for (let j = 0; j < mockUserData[i].platforms.length; j++) {
      if (mockUserData[i].platforms[j].platformName === platformName) {
        if (mockUserData[i].platforms[j].username === username) {
          return true;
        }
      }
    }
  }
  return null;
}

router.post('/addNewUser', function (req, res, next) {
  console.log(req.body);
  const newUsername = req.body.username;
  const chatPlatform = req.body.chatPlatform;
  const platformUsername = req.body.platformUsername;
  const userData = checkIfUserExists(newUsername);
  let platformId;

  if (userData) {
    res.json({ userNotification: 'Username already exists!' });
    return res.end();
  }

  if (checkIfPlatformUserExists(chatPlatform, platformUsername)) {
    res.json({ userNotification: chatPlatform + ' username already attached to a user!' });
    return res.end();
  };

  if(chatPlatform === "slack") {
    checkSlackUsername(platformUsername).then(function(data){
      if(data) {
        platformId = data.id;
        res.json({ userNotification: 'User successfully added, Slack ID: ' + platformId });
        return res.end();
      }
      else {
        res.json({ userNotification: 'Unable to lookup Slack information!' });
        return res.end();
      }
    });
  }
});

module.exports = router;