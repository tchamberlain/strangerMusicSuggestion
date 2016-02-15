angular.module('strangerMusicSuggestion', [
  'ngRoute',
  'spotify'
])
.config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('123456789123456789');
    SpotifyProvider.setRedirectUri('http://example.com/callback.html');
    SpotifyProvider.setScope('playlist-read-private');
  })

.controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

   $scope.searchArtist = function () {
     Spotify.search($scope.searchartist, 'artist').then(function (data) {
       $scope.artists = data.artists.items;
     });
   };

   $scope.login = function () {
     Spotify.login().then(function (data) {
       console.log(data);
       alert("You are now logged in");
     }, function () {
       console.log('didn\'t log in');
     })
   };
}]);