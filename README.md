# Project

Inital steps and user data model for an Express application that manages users multiple chat applications.

## Installing

Install Dependencies
```
npm install
```
Slack Token for workspace integration
```
Add .env file to project root
```
Start the server with
```
npm start
```

## Available Endpoints using mock_users.json:

JSON for all users
```
/api/users
```
JSON for an individual user
```
/api/users/Gutierrez%20Sykes
```
View with users and their respective slack usernames
```
/users
```
Add user form. 

This verifies there is not an existing application username in mock_users.json, an existing Slack username in mock_users.json, and checks to verify the Slack username exists on the workspace. Currently prints out the needed slack user ID on a successful submit (kevinmbruland and slackbot available on the test slack workspace)
```
http://localhost:3000/users/newUser
```
