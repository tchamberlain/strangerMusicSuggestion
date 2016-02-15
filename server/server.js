var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/stranger');

// configure our server with all the middleware and routing
//no middleware for now
//require('./config/middleware.js')(app, express);
//require('./config/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(8000);

// export our app for testing and flexibility, required by index.js
module.exports = app;


//ADDED THIS
// Serve the client files
app.use(express.static(__dirname + '/../client'));
