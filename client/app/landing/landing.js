angular.module('landing', [])
.controller('landingController', ['$window','$scope', 'Spotify', 'User','$location', function ($window, $scope, Spotify, User, $location) {
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
            //save current user in scope and their id in local storage
            $scope.userObj = resp.data;
            $window.localStorage.setItem('currentUserID',  $scope.userObj.spotifyID);

            //get all other users
            User.allUsers()
            .then(function(data){
              $scope.usersArr = data.data;
              var match = User.findMatch($scope.userObj, $scope.usersArr);

              //update the user's entry in the db to include the match
              User.setStranger(match);

              $location.path('/stranger');
            });
          });
          });

      }, function(error) {
          console.log('error getting user data');
      });
      
       console.log("You are now logged in");
     }, function () {
       console.log('didn\'t log in');
     })
   };

}])
