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
    var obj1 = {tournamentId:11, tournamentName:'Frankfurt major', imageSource:'http://cdn.dota2.com/apps/dota2/images/blogfiles/blog_frankfurt_major_announcement.jpg'};
    var obj2 = {tournamentId:22, tournamentName:'Shanghai major', imageSource:'http://cdn.dota2.com/apps/dota2/images/blogfiles/shanghai_major.jpg'};
    var obj3 = {tournamentId:33, tournamentName:'Manila major', imageSource:'http://cdn.dota2.com/apps/dota2/images/blogfiles/blog_manila_announcement.jpg'};
    var obj4 = {tournamentId:44, tournamentName:'The International', imageSource:'http://cdn.dota2.com/apps/dota2/images/blogfiles/ti6_aegis_banner.jpg'};
    $scope.tourneys = [obj1, obj2, obj3, obj4];
	$scope.viewTournament = function (tourney){
		$location.path('ViewTournament' + '/' + tourney);
	};
});

app.controller('ViewTournamentController', function($scope, $routeParams, $location, $interval){
	$scope.tournamentName = $routeParams.tournamentName;
	$scope.backToListTournament = function (){
		$location.path('/');
	};

    var intervalPromise;

    var obj1 = {
        matchId: 1111,
        team1:{name:'Team Liquid', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        team2:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        schedule:(new Date(2016, 4, 25)).getTime(),
        stage:'Upper Bracket - Main event',
        countdown:""
    };
    var obj2 = {
        matchId: 2222,
        team1:{name:'Team LoooooooooooongNameeeeeeeeeeeeeeeee', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        team2:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        schedule:(new Date(2016, 4, 10)).getTime(),
        stage:'Lower Bracket - Main event',
        countdown:""
    };
    var obj3 = {
        matchId: 3333,
        team1:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        team2:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        schedule:(new Date(2016, 4, 15)).getTime(),
        stage:'Group stage',
        countdown:""
    };
    var obj4 = {
        matchId: 4444,
        team1:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        team2:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        schedule:(new Date(2016, 4, 22)).getTime(),
        stage:'Qualifiers - 2nd round',
        countdown:""
    };
    $scope.matches = [obj1, obj2, obj3, obj4];

    $scope.updateTime = function(){
        for(var x = 0; x < $scope.matches.length; x++)
        {
            var timeDifference = ($scope.matches[x].schedule - Date.now()) / 1000;
            var rawDays = timeDifference / (60 * 60 * 24);
            var daysLeft = rawDays >= 1 ? Math.floor(rawDays) : 0;
            var rawHours = daysLeft > 0 ? (rawDays - daysLeft) * 24 : rawDays * 24;
            var hoursLeft = rawHours >= 1 ? Math.floor(rawHours) : 0;
            var rawMinutes = hoursLeft > 0 ? (rawHours - hoursLeft) * 60 : rawHours * 60;
            var minutesLeft = rawMinutes >= 1 ? Math.floor(rawMinutes) : 0;
            var rawSeconds = minutesLeft > 0 ? (rawMinutes - minutesLeft) * 60 : rawMinutes * 60;
            var secondsLeft = Math.floor(rawSeconds);

            if(daysLeft < 1 && hoursLeft < 1 && minutesLeft < 1 && secondsLeft < 1)
            {
                $interval.cancel(intervalPromise);
                $scope.countdownList[x].countdown = (daysLeft == 0 ? "" : daysLeft + 'D ')  + (hoursLeft == 0 ? "" : hoursLeft + 'H ') + (minutesLeft == 0 ? "" : minutesLeft + 'M ') + (secondsLeft == 0 ? "" : secondsLeft + 'S');
                return;
            }

            $scope.matches[x].countdown = (daysLeft == 0 ? "" : daysLeft + 'D ')  + (hoursLeft == 0 ? "" : hoursLeft + 'H ') + (minutesLeft == 0 ? "" : minutesLeft + 'M ') + (secondsLeft == 0 ? "" : secondsLeft + 'S');
        }
    }

    var countDownLimit = Math.round(($scope.matches[0].schedule - Date.now()) / 1000);
    debugger;

    intervalPromise = $interval($scope.updateTime, 1000, countDownLimit);

    $scope.viewMatch = function (matchObj){
        $location.path('ViewMatch' + '/' + $scope.tournamentName + '/' + matchObj.matchId);
    };
});

app.controller('ViewMatchController', function($scope, $routeParams, $location, $interval){
    $scope.tournamentName = $routeParams.tournamentName;
    $scope.matchId = $routeParams.matchId;
    $scope.match = {
        matchId: 1111,
        team1:{name:'Team Liquid', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        team2:{name:'Team Secret', icon:'https://pbs.twimg.com/profile_images/587609238479986688/OnTi5wQI.png'},
        schedule:(new Date(2016, 4, 25)).getTime(),
        stage:'Upper Bracket - Main event',
        countdown:""
    };

    var intervalPromise;
    $scope.updateTime = function(){
        var timeDifference = ($scope.match.schedule - Date.now()) / 1000;
        var rawDays = timeDifference / (60 * 60 * 24);
        var daysLeft = rawDays >= 1 ? Math.floor(rawDays) : 0;
        var rawHours = daysLeft > 0 ? (rawDays - daysLeft) * 24 : rawDays * 24;
        var hoursLeft = rawHours >= 1 ? Math.floor(rawHours) : 0;
        var rawMinutes = hoursLeft > 0 ? (rawHours - hoursLeft) * 60 : rawHours * 60;
        var minutesLeft = rawMinutes >= 1 ? Math.floor(rawMinutes) : 0;
        var rawSeconds = minutesLeft > 0 ? (rawMinutes - minutesLeft) * 60 : rawMinutes * 60;
        var secondsLeft = Math.floor(rawSeconds);

        if(daysLeft < 1 && hoursLeft < 1 && minutesLeft < 1 && secondsLeft < 1)
        {
            $interval.cancel(intervalPromise);
            $scope.match.countdown = (daysLeft == 0 ? "" : daysLeft + 'D ')  + (hoursLeft == 0 ? "" : hoursLeft + 'H ') + (minutesLeft == 0 ? "" : minutesLeft + 'M ') + (secondsLeft == 0 ? "" : secondsLeft + 'S');
            return;
        }

        $scope.match.countdown = (daysLeft == 0 ? "" : daysLeft + 'D ')  + (hoursLeft == 0 ? "" : hoursLeft + 'H ') + (minutesLeft == 0 ? "" : minutesLeft + 'M ') + (secondsLeft == 0 ? "" : secondsLeft + 'S');
    }

    var countDownLimit = Math.round(($scope.match.schedule - Date.now()) / 1000);
    debugger;

    intervalPromise = $interval($scope.updateTime, 1000, countDownLimit);

    $scope.backToViewTournament = function (){
        $location.path('ViewTournament' + '/' + $scope.tournamentName);
    };
});

function updateTime(){
    var schedule = new Date(2016, 4, 22).getTime();
    return new Date(schedule-1000);
}