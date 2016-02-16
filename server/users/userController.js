var User = require('./userModel.js');
    Q = require('q');
   // util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findAllUsers = Q.nbind(User.find, User);


module.exports = {
  
  createUser: function (req, res, next) {
    var spotifyID = req.body.spotifyID;
      findLink({spotifyID: spotifyID})
        .then(function (match) {
          if (match) {
            res.send(match);
          } else {
            console.log('user not found...');
          }
        })
        .then(function () {
          var newUser = {
            savedSongs: req.body.savedSongs,
            name: req.body.name,
            spotifyID: req.body.spotifyID
          };
          return createUser(newUser);
        })
        .then(function (createUser) {
          if (createUser) {
            res.json(createUser);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }


};