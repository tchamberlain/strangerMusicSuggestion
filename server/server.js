var express = require('express');
var mongoose = require('mongoose');
var userController = require('./users/userController.js');
var bodyParser = require('body-parser');


var app = express();

// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/stranger');

// start listening to requests on port 8000
app.listen(8000);
console.log('listening');


app.use(bodyParser.json());


app.post('/api/users/', userController.createUser);
app.get('/api/users/', userController.allUsers);
app.post('/api/stranger/', userController.setStranger);
app.get('/api/users/:currentUserID', userController.currentUser);
app.post('/api/sendSong/:strangerID', userController.sendSong);



// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If user logs in, handle post request to create user

module.exports = app;
