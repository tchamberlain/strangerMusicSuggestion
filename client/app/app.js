var strangerMusicSuggestion = angular.module('strangerMusicSuggestion', [
  'ngRoute',
  'spotify',
  'services'
])
.config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('e9b4e7c950bf4ed48b9571c71b691289');
    SpotifyProvider.setRedirectUri('http://localhost:8000/callback.html');
    SpotifyProvider.setScope('user-library-read user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
    SpotifyProvider.setAuthToken('c38000e14c4e4d64a3ac41d44f0eec51');

  })
