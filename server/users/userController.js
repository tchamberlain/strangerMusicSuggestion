var User = require('./userModel.js');
    Q = require('q');
   // util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findAllUsers = Q.nbind(User.find, User);


module.exports = {
  
  createUser: function (req, res, next) {
    console.log('we GOT HERE TO CREATE USER IN CONTROLLER', req); 
    var spotifyID = req.body.spotifyID;
      findUser({spotifyID: spotifyID})
        .then(function (match) {
          if (match) {
            res.send(match);
          } else {
            return match;
          }
        })
        .then(function () {
          // if (!match){
            
          // }
          var newUser = {
            // savedSongs: req.body.savedSongs,
            savedSongs: 1,
            name: req.body.name,
            spotifyID: req.body.spotifyID
          };
          return createUser(newUser);
        })
        .then(function (createUser) {
          if (createUser) {
            console.log('user create lol');
            res.json(createUser);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }


};