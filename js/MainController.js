var app = angular.module('mainApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/', {templateUrl: 'partials/list_tournaments.html', controller: 'ListTournamentsController'}).
		when('/ViewTournament/:tournamentName', {templateUrl: 'templates/view_tournament.html', controller: 'ViewTournamentController'}).
        when('/ViewMatch/:tournamentName/:matchId', {templateUrl: 'templates/view_match.html', controller: 'ViewMatchController'}).
		otherwise({
            redirectTo: '/'
        });
}]);

app.controller('ListTournamentsController', function($scope, $location){
    var obj1 = {tournamentId:11, tournamentName:'Frankfurt major', imageSource:'http://wiki.teamliquid.net/commons/images/3/3b/Frankfurt_Major_Banner.png'};
    var obj2 = {tournamentId:22, tournamentName:'Shanghai major', imageSource:'http://hydra-media.cursecdn.com/dota2.gamepedia.com/archive/0/0a/20160218172905%21Minibanner_Dota_2_Major_Winter_2016.jpg'};
    var obj3 = {tournamentId:33, tournamentName:'Manila major', imageSource:'http://hydra-media.cursecdn.com/dota2.gamepedia.com/archive/0/0a/20160218172905%21Minibanner_Dota_2_Major_Winter_2016.jpg'};
    var obj4 = {tournamentId:44, tournamentName:'The International', imageSource:'http://hydra-media.cursecdn.com/dota2.gamepedia.com/archive/0/0a/20160218172905%21Minibanner_Dota_2_Major_Winter_2016.jpg'};
    $scope.tourneys = [obj1, obj2, obj3, obj4];
	$scope.viewTournament = function (tourney){
		$location.path('ViewTournament' + '/' + tourney);
	};
});

app.controller('ViewTournamentController', function($scope, $routeParams, $location){
	$scope.tournamentName = $routeParams.tournamentName;
	$scope.backToListTournament = function (){
		$location.path('/');
	};

    //$scope.matches=['Team Secret vs Evil Geniuses','Fnatic v Mineski','OG vs Liquid', 'EHOME vs Vici Gaming'];
    var obj1 = { matchId: 1111, matchName: 'Team Secret vs Evil Geniuses' };
    var obj2 = { matchId: 2222, matchName: 'Fnatic v Mineski' };
    var obj3 = { matchId: 3333, matchName: 'OG vs Liquid' };
    var obj4 = { matchId: 4444, matchName: 'EHOME vs Vici Gaming' };
    $scope.matches = [obj1, obj2, obj3, obj4];
    $scope.viewMatch = function (matchObj){
        $location.path('ViewMatch' + '/' + $scope.tournamentName + '/' + matchObj.matchId);
    };
});

app.controller('ViewMatchController', function($scope, $routeParams, $location){
    $scope.tournamentName = $routeParams.tournamentName;
    $scope.matchId = $routeParams.matchId;
    $scope.match = $scope.tournamentName + 'match #' + $scope.matchId;
    
    $scope.backToViewTournament = function (){
        $location.path('ViewTournament' + '/' + $scope.tournamentName);
    };
});