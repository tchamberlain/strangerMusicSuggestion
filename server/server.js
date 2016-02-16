var express = require('express');
var mongoose = require('mongoose');
var userController = require('./users/userController.js');
var bodyParser = require('body-parser');


var app = express();

// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/stranger');

// configure our server with all the middleware and routing
//no middleware for now
//require('./config/middleware.js')(app, express);
//require('./config/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(8000);
console.log('listening');


app.use(bodyParser.json());


app.post('/api/users/', userController.createUser);
app.get('/api/users/', userController.allUsers);

// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If user logs in, handle post request to create user

module.exports = app;
