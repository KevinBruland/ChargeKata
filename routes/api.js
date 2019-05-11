const express = require('express');
const router = express.Router();
const axios = require('axios');

const slackUserListEndpoint = 'https://slack.com/api/users.list';
const slackToken = 'xoxp-632588809957-621199038658-626296138849-70847a8e64e10c67933bba161e7c3103';

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
            return res.json(
              { slackId: slackMembers[i].id }
            );
          }
        }
        res.json(
          { error: 'No slack username, ' + reqName + ', found' }
        );
      });
  } else {
    res.json(
      { error: 'No name value provided' }
    )
  }
});

module.exports = router;