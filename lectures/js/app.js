// Instantiate app
var lessonModule = angular.module('LessonApp',[])

// Get data
lessonModule.factory('Items', ['$http', function($http){
  var Url   = "data/lectures.csv";
  var Items = $http.get(Url).then(function(response){
  	test = response.data
     return CSVToArray(response.data);
  });
  return Items;
}]);

// Controller
lessonModule.controller('LessonController',['$scope', 'Items', function($scope, Items){
	Items.then(function(data){
	  $scope.items = data;
	});
}])
