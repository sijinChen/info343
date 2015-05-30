// Main app
var mainApp = angular.module('MainApp', ['LandingApp', 'LectureApp', 'ChallengeApp'])

// main Controller
mainApp.controller('MainController', ['$scope', function($scope){
  $scope.page = 'pages/landing.html'
  $scope.setView = function(url) {
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
    console.log("landing content ", data)
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
var dat;
// Controller
challengeModule.controller('ChallengeController',['$scope', 'ChallengeData', function($scope, ChallengeData){
  ChallengeData.then(function(data){
    $scope.challenges = data;
    $scope.currentChallenge = null
     dat = data
    $scope.viewChallenge = function(url) {
      var currentChallenge = url == null ? null : 'challenges/' + url + '.html'
      $scope.currentChallenge = currentChallenge
    }
  });
}])
    
