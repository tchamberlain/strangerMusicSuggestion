//later put this in a controller
angular.module('strangerMusicSuggestion', [
  'ngRoute',
  'spotify'
])
.config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('e9b4e7c950bf4ed48b9571c71b691289');
    SpotifyProvider.setRedirectUri('http://localhost:8000/callback.html');
    SpotifyProvider.setScope('user-library-read user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
    SpotifyProvider.setAuthToken('c38000e14c4e4d64a3ac41d44f0eec51');

  })

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

})

.controller('userController', ['$scope', 'Spotify', 'User', function ($scope, Spotify, User) {

  $scope.user = {};  
  $scope.login = function () {
    Spotify.login().then(function (data) {
      // after login get current user
      Spotify.getCurrentUser()
      .then(function (userData) {
        Spotify.getSavedUserTracks()
        .then( function (songsData) {
          //make new user with username, id, saved songs
          console.log(userData, 'USERDATA',userData.display_name, userData.id, songsData.items);
          //sends a post request to the server
          //hack bc my test acct hasnt been assigned an id
          if(name === 'tchamberlaintest'){
            userData.id = '1234';
          }
          User.makeNewUser({name: userData.display_name||userData.id, savedSongs: songsData.items, spotifyID: userData.id})
          .then(function(resp){
            //save current user in scope
            $scope.userObj = resp.data;
            //get all other users
            User.allUsers()
            .then(function(data){
              $scope.usersArr = data.data;
              var match = User.findMatch($scope.userObj, $scope.usersArr);
              $scope.match = match;
            });
          });
          });

      }, function(error) {
          console.log('error!!!');
      });
      
       console.log("You are now logged in");
     }, function () {
       console.log('didn\'t log in');
     })
   };


   //logout
    $scope.logout = User.logout;

}])
