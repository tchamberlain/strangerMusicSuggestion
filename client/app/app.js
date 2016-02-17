var strangerMusicSuggestion = angular.module('strangerMusicSuggestion', [
  'ngRoute',
  'spotify',
  'services',
  'landing',
  'stranger'
])
.config(function (SpotifyProvider, $routeProvider, $httpProvider) {
    SpotifyProvider.setClientId('e9b4e7c950bf4ed48b9571c71b691289');
    SpotifyProvider.setRedirectUri('http://localhost:8000/callback.html');
    SpotifyProvider.setScope('user-library-read user-read-private playlist-read-private user-library-modify playlist-modify-public');
    SpotifyProvider.setAuthToken('c38000e14c4e4d64a3ac41d44f0eec51');

    $routeProvider
      .when('/', {
        templateUrl: 'app/landing/landing.html',
        controller: 'landingController'
      })
      .when('/stranger', {
        templateUrl: 'app/stranger/stranger.html',
        controller: 'strangerController',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });
  })


