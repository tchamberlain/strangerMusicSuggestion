angular.module('stranger', [])
.controller('strangerController', ['$window','$scope', 'Spotify', 'User','$location', function ($window,$scope, Spotify, User, $location) {
	
	User.getCurrentUser().then(function(currentUserData){
		if(!currentUserData){
			//LOGIN
		} else{
			$scope.currentUser = currentUserData.data;
			$scope.stranger = $scope.currentUser.stranger;
			$scope.receivedSongs = $scope.currentUser.receivedSongs;

		}
	});


	$scope.searchSong = function (title) {
		Spotify.search(title, 'track').then(function (data) {
		  console.log(data);
		  $scope.songs=data.tracks.items;
		});
	};

	$scope.sendSong = function (song) {
		console.log('got song??', song);
		var strangerID = $scope.stranger.spotifyID;
		User.sendSong(song, strangerID);
		alert('Song sent!');
	};


}]);
