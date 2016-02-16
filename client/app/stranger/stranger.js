angular.module('stranger', [])
.controller('strangerController', ['$window','$scope', 'Spotify', 'User','$location', function ($window,$scope, Spotify, User, $location) {
	User.getCurrentUser().then(function(currentUserData){
		if(!currentUserData){
			//LOGIN
		} else{
			$scope.currentUser = currentUserData.data;
			$scope.stranger = $scope.currentUser.stranger;
			console.log('scope stranger',$scope.stranger );
		}
	})
}]);
