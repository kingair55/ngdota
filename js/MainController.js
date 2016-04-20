var app = angular.module('mainApp', []);
app.controller('mainCtrl', function($scope){
	$scope.showMajorDetails = false;
	$scope.tourneys=['Frankfurt major','Shanghai major','Manila major', 'The International'];
	$scope.tourneyClicked = "";
	$scope.click = function (tourney){
		$scope.tourneyClicked = tourney;
		$scope.showMajorDetails = !$scope.showMajorDetails;
	};
	$scope.backMain = function (){
		$scope.showMajorDetails = false;
	};
});