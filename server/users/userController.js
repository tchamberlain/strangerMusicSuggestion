var User = require('./userModel.js');
    Q = require('q');
   // util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findAllUsers = Q.nbind(User.find, User);


module.exports = {
  
  allUsers: function (req, res, next) {
  findAllUsers({})
    .then(function (users) {
      res.json(users);
    })
    .fail(function (error) {
      next(error);
    });
  },

  createUser: function (req, res, next) {
    var spotifyID = req.body.spotifyID;
      findUser({spotifyID: spotifyID})
        .then(function (match) {
          if (match) {
            res.send(match);
          } else {
            var noMatch = true;
            return noMatch;
          }
        })
        .then(function (noMatch) { // this is hacky, ask about this
          if (noMatch){
            var newUser = {
             savedSongs: req.body.savedSongs,
             // savedSongs: 1,
              name: req.body.name,
              spotifyID: req.body.spotifyID
            };
            return createUser(newUser);
          }
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