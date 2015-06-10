// Main app
var mainApp = angular.module('MainApp', ['LandingApp', 'LectureApp', 'ChallengeApp','ngRoute'])


.controller('Test', function($scope, $routeParams) {
     $scope.name = "TestController";
     $scope.params = $routeParams;
 })
// main Controller
.controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })
.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/test/', {
    templateUrl: 'pages/challenges.html',
    controller: 'ChallengeController',
  })
   $locationProvider.html5Mode(true);
})
mainApp.controller('MainController', ['$scope', '$location', function($scope,$location){
  var location = $location.path().split('/')[1] == undefined ? '' : $location.path().split('/')[1]
  $scope.page = location.length == 0 ? 'pages/landing.html' : 'pages/' + location + '.html'
  $scope.setView = function(url) {
    console.log('url ', url)
    var path = url.indexOf("landing") == -1 ? url.replace('.html','') : ''
    $location.path(path)  
    $scope.page = 'pages/' + url
  }
}])

// Landing page appp
var landingModule = angular.module('LandingApp',[])

// Landing page data
landingModule.factory('LandingData', ['$http', function($http){
  var Url   = "data/content.csv";
  var LandingData = $http.get(Url).then(function(response){
     arr = CSVToArray(response.data);
     var ret = {}
     arr.map(function(d) {ret[d.section] = d.content})
     return ret
  })
  return LandingData
}]);

// Landing page controller
landingModule.controller('LandingController',['$scope', 'LandingData', function($scope, LandingData){
	LandingData.then(function(data){
	  $scope.content = data;
	});
}])
    

// Instantiate app
var lectureModule = angular.module('LectureApp',[])

// Get data
lectureModule.factory('Items', ['$http', function($http){
  var Url   = "data/lectures.csv";
  var Items = $http.get(Url).then(function(response){
    test = response.data
     return CSVToArray(response.data);
  });
  return Items;
}]);

// Lecture controller
lectureModule.controller('LectureController',['$scope', 'Items', function($scope, Items){
  Items.then(function(data){
    $scope.items = data;
  });
}])


// Challenge App
var challengeModule = angular.module('ChallengeApp',[])

// Challenge data
challengeModule.factory('ChallengeData', ['$http', function($http){
  var Url   = "data/challenges.csv";
  var ChallengeData = $http.get(Url).then(function(response){
     return CSVToArray(response.data);
  });
  return ChallengeData;
}]);

// Challenge data
challengeModule.factory('ChallengeRubric', ['$http', function($http){
  console.log('get rubrics!')
  var Url   = "data/rubrics.csv";
  var ChallengeRubrics = $http.get(Url).then(function(response){
     return CSVToArray(response.data);
  });
  return ChallengeRubrics
}]);

// Controller
challengeModule.controller('ChallengeController',['$scope', '$location', '$q', 'ChallengeData', 'ChallengeRubric', function($scope, $location, $q, ChallengeData, ChallengeRubric){
  $q.all([ChallengeData, ChallengeRubric]).then(function(values){    
    $scope.challenges = values[0];    
    $scope.rubrics = values[1];
    $scope.getChallenge = function() {
      var challenge = $location.path().split('/')[2] == undefined ? null : $location.path().split('/')[2] 
      console.log('challenge ', challenge)
      $scope.currentChallenge = challenge 
      $scope.currentChallengeUrl = challenge == undefined ? null : 'challenges/' + challenge +'.html'
      $scope.currentRubric = $scope.rubrics.filter(function(d) {
        if($scope.currentChallenge == null) return false
        console.log(d.challenge_id, $scope.currentChallenge)
        return d.challenge_id == $scope.currentChallenge
      });  
      $scope.submitUrl = $scope.currentChallenge == null ? '' : $scope.challenges.filter(function(d){return d.challenge_id == $scope.currentChallenge})[0].submitUrl
      console.log('submitURl, ',  $scope.submitUrl)
    }
    $scope.getChallenge()
    $scope.viewChallenge = function(url) {
      var path = url == null ? 'challenges': $location.path() +'/' + url
      $location.path(path)
      $scope.getChallenge()
    }

  })
}])
    
