angular.module('services', [])
.factory('User', function ($window, $http) {
  var userObj = {};
  var currentUserID = $window.localStorage.getItem('currentUserID');

  var sendSong = function (song,strangerID) {
    return $http({
      method: 'POST',
      url: '/api/sendSong/'+strangerID,
      data: {song: song}
    })
    .then(function (resp) {
      return resp;
    });
  };

  var makeNewUser = function (data) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: data
    })
    .then(function (resp) {
      userObj = resp.data;
      return resp;
    });
  };
    var setStranger = function (stranger) {
      //get user and stranger id for db update
      var currentUserID = $window.localStorage.getItem('currentUserID');
      var data = {currentUserID:currentUserID, stranger: stranger};

      return $http({
            method: 'POST',
            url: '/api/stranger',
            data: data
          })
          .then(function (resp) {
            return resp;
          });
    };

    var getCurrentUser = function () {
      console.log(currentUserID,'currentUserID');
      return $http({
        method: 'GET',
        url: '/api/users/' + currentUserID,
      })
      .then(function (resp) {
        console.log('we get a user??',resp);
        return resp;
      });
    };

    var allUsers = function () {
      return $http({
        method: 'GET',
        url: '/api/users',
      })
      .then(function (resp) {
        return resp;
      });
    };

    var findMatch = function(thisUser, otherUsers){
      var numCommonArtists = 0;
      var currMatch = 'Sorry no match ';
      var currCount = 0;
      var artistObj;

        for(var i = 0; i < otherUsers.length; i++){
          //if isn't current user
          if(otherUsers[i].spotifyID !== thisUser.spotifyID){
            //set comparison user
            artistObj = otherUsers[i].artistObj;
            // reset current count to 0
            currCount = 0;
            for(var key in thisUser.artistObj){
                console.log(key, 'KEY',thisUser.artistObj[key],'VALE' );
              if (key in artistObj){
                currCount ++;
              }
            }
            if(currCount > numCommonArtists){
              currMatch = otherUsers[i];
            }
          }
            
          }
        return currMatch;
    };
 
  return {
    makeNewUser: makeNewUser,
    allUsers: allUsers,
    findMatch: findMatch,
    setStranger: setStranger,
    getCurrentUser: getCurrentUser,
    sendSong: sendSong
  };

});