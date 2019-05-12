const axios = require('axios');
const slackToken = process.env.SLACK_TOKEN;
const slackUserListEndpoint = 'https://slack.com/api/users.list?token='

async function getSlackUsersList() {
    const res = await axios.get(slackUserListEndpoint + slackToken);
    return res.data;
}

exports.getSlackUsers = async (req, res) => {
    const slackUsers = await getSlackUsersList();   
    res.json(slackUsers.members);
    res.end();
}

// TODO: Verify the slack app API really can't lookup user info by username?
// exports.getSlackUserList = (req, res, next) => {
//     const slackUserListEndpoint = 'https://slack.com/api/users.list';
//     const slackToken = process.env.SLACK_TOKEN;
//     const slackUsername = req.query.username;
//     axios.get(slackUserListEndpoint + '?token=' + slackToken)
//         .then(function (slackRes) {
//             req.slackUserList = slackRes.data.members;
//             next();

//         })
//         .catch(function (err) {
//             console.log(err);
//             res.json({ error: 'Unable to get slack user list' });
//         });
// }

// exports.getSlackUser = (req, res, next) => {
//     const slackUsername = req.query.username;
//     const slackMembers = req.slackUserList;
//     console.log(slackUsername);

//     if (!req.query.username) {
//         res.json({ error: 'no username provided' })
//         return res.end
//     }

//     for (let i = 0; i < slackMembers.length; i++) {
//         if (slackUsername === slackMembers[i].name) {
//             console.log(slackUsername);
//             req.slackUserData = slackMembers[i];
//             next();
//         }
//     }
//     res.json({ error: 'Username not found on Slack workspace' });
//     res.end();
// }

// exports.getSlackUserId = (req, res) => {
//     res.json({ slackUserId: req.slackUserData.id });
// }