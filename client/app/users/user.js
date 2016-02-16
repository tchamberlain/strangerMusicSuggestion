strangerMusicSuggestion
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
          console.log('error getting user data');
      });
      
       console.log("You are now logged in");
     }, function () {
       console.log('didn\'t log in');
     })
   };
   //logout
    $scope.logout = User.logout;

}])
