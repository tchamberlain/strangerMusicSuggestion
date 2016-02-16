angular.module('services', [])
.factory('User', function ($http) {
  var makeNewUser = function (data) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: data
    })
    .then(function (resp) {
      console.log('resp RESPONSE',resp);
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

    var logout = function(){
      localStorage.setItem('spotify-token', null);
      console.log()
    };

    var findMatch = function(thisUser, otherUsers){
      console.log(thisUser,otherUsers, 'FINDMATCH');
      var numCommonArtists = 0;
      var currMatch = 'Sorry no match ';
      var currCount = 0;
      var artistObj;

        for(var i = 0; i < otherUsers.length; i++){
          //if isn't current user
          if(otherUsers[i].spotifyID !== thisUser.spotifyID){
            //set comparison user
            artistObj = otherUsers[i];
            // reset current count to 0
            currCount = 0;
            for(var key in thisUser.artistObj){
                console.log(key, 'key');
              if (key in artistObj){
                currCount ++;
              }
            }
            if(currCount > numCommonArtists){
              currMatch = otherUsers[i];
            }
          }
          console.log(currMatch);
            
          }
        return currMatch;
    };
 
  return {
    makeNewUser: makeNewUser,
    allUsers: allUsers,
    logout: logout,
    findMatch: findMatch
  };

});