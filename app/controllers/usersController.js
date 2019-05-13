const axios = require('axios');
const slackToken = process.env.SLACK_TOKEN;
const mockUserData = require('../mock/mock_users');
const slackUserListEndpoint = 'https://slack.com/api/users.list?token='

// TODO: user ID is needed for some slack API functionality. 
// Verify the slack app API really can't lookup user info and ID by username?
async function getSlackUsersList() {
    const res = await axios.get(slackUserListEndpoint + slackToken);
    return res.data.members;
}

function checkIfUserExists(username) {
    return getUserList().find(user => user.name === username);
}

function checkIfPlatformUserExists(username, platformName) {
    const users = getUserList();
    
    // TODO: Refactor
    const slackUsers = users.filter(user => user.platforms.find(platform => platform.platformName === platformName && platform.username === username));
    return slackUsers.length;
}

function getUserList() {
    return mockUserData;
}

function getSlackUserId(username) {
    return getSlackUsersList().then(res => res.find(user => user.name === username));
}

exports.usersHome = (req, res) => {
    const platformUsers = getUserList();
    res.render("users", {users: platformUsers});
}

exports.newUserPage = (req, res) => {
    res.render("addUser")
}

exports.registerNewUser = async (req, res) => {
    const newUsername = req.body.username;
    const chatPlatform = req.body.chatPlatform;
    const platformUsername = req.body.platformUsername;    
    const existingCheck = checkIfUserExists(newUsername);

    if (existingCheck) {
        return res.json({userNotification: "User already exsits!"});
    }

    if (checkIfPlatformUserExists(platformUsername, chatPlatform)) {
        return res.json({userNotification: "That Slack name is already attached to an account"});
    }

    const slackUserInfo = await getSlackUserId(platformUsername);
    // Check is provided Slack username exists on the workspace and pull the ID
    if (slackUserInfo) {        
        return res.json({userNotification: "User added! - Slack ID: " + slackUserInfo.id});
    }

    return res.json({userNotification: "Slack username does not exist on the workspace!"});    
}

exports.getUsers = (req, res) => {
    res.json(getUserList());
}

exports.getUser = (req, res) => {
    const reqUsername = req.params.username;
    const foundUser = getUserList().find(user => user.name === reqUsername);
    if (foundUser) {
        return res.json(foundUser);
    }
    res.json({error: "User does not exist!"});
}