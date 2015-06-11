// Start ap
var mainApp = angular.module('MainApp', ['ngRoute'])

// Config route provider
.config(function($routeProvider) {
  $routeProvider
   .when('/challenges/:challenge_id?', {
    templateUrl: 'pages/challenges.html',
    controller: 'ChallengeController',
  })
   .when('/lectures/', {
    templateUrl: 'pages/lectures.html',
    controller: 'LectureController',
  })
   .when('/', {
    templateUrl: 'pages/landing.html',
    controller: 'LandingController',
  })
})

// Landing page controller
.controller('LandingController',['$scope', 'LandingData', function($scope, LandingData){
  LandingData.then(function(data){
    $scope.content = data;
  });
}])

// Challenge Controller
.controller('ChallengeController', function($scope, $q, $routeParams, ChallengeData, ChallengeRubric){
  $q.all([ChallengeData, ChallengeRubric]).then(function(values){    
    $scope.challenges = values[0];    
    $scope.rubrics = {}
    values[1].map(function(d) {
      if($scope.rubrics[d.challenge_id] == undefined)$scope.rubrics[d.challenge_id] = []
      $scope.rubrics[d.challenge_id].push(d)
    })
    $scope.currentChallenge = $routeParams.challenge_id
    $scope.currentRubric = $scope.rubrics[$routeParams.challenge_id]
  })
})

// Lecture controller
.controller('LectureController',['$scope', 'Items', function($scope, Items){
  Items.then(function(data){
    $scope.items = data;
  });
}])


// Landing page data
.factory('LandingData', ['$http', function($http){
  var Url   = "data/content.csv";
  var LandingData = $http.get(Url).then(function(response){
     arr = CSVToArray(response.data);
     var ret = {}
     arr.map(function(d) {ret[d.section] = d.content})
     return ret
  })
  return LandingData
}])
    

// Get data
.factory('Items', ['$http', function($http){
  var Url   = "data/lectures.csv";
  var Items = $http.get(Url).then(function(response){
    test = response.data
     return CSVToArray(response.data);
  });
  return Items;
}])


// Challenge data
.factory('ChallengeData', ['$http', function($http){
  var Url   = "data/challenges.csv";
  var ChallengeData = $http.get(Url).then(function(response){
     return CSVToArray(response.data);
  });
  return ChallengeData;
}])

// Challenge data
.factory('ChallengeRubric', ['$http', function($http){
  var Url   = "data/rubrics.csv";
  var ChallengeRubrics = $http.get(Url).then(function(response){
     return CSVToArray(response.data);
  });
  return ChallengeRubrics
}]);