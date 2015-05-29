// Instantiate app
var challengeModule = angular.module('ChallengeApp',[])

// Get data
challengeModule.factory('Items', ['$http', function($http){
  var Url   = "data/challenges.csv";
  var Items = $http.get(Url).then(function(response){
     return CSVToArray(response.data);
  });
  return Items;
}]);
var dat;
// Controller
challengeModule.controller('ChallengeController',['$scope', 'Items', function($scope, Items){
	Items.then(function(data){
	  $scope.challenges = data;
    $scope.currentChallenge = null
     dat = data
    $scope.viewChallenge = function(url) {
      var currentChallenge = url == null ? null : 'challenges/' + url + '.html'
      $scope.currentChallenge = currentChallenge
    }
	});
}])
    