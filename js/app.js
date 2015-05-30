// Instantiate app
var landingModule = angular.module('LandingApp',[])

// Get data
landingModule.factory('Items', ['$http', function($http){
  var Url   = "data/content.csv";
  var Items = $http.get(Url).then(function(response){
     arr = CSVToArray(response.data);
     var ret = {}
     arr.map(function(d) {ret[d.section] = d.content})
     return ret
  })
  return Items
}]);
var dat;
// Controller
landingModule.controller('LandingController',['$scope', 'Items', function($scope, Items){
	Items.then(function(data){
    dat = data
	  $scope.content = data;
	});
}])
    