var myApp = angular.module('myapp', ['ngRoute', 'ngResource']); 

myApp.factory('Users', ['$resource',function($resource){
  return $resource('/users.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

myApp.factory('User', ['$resource', function($resource){
  return $resource('/users/:id.json', {}, {
    show: { method: 'GET' }
  });
}]);

myApp.controller("UserListCtr", ['$scope', '$http', '$resource', 'Users', 'User', '$location', function($scope, $http, $resource, Users, User, $location) {

  $scope.users = Users.query();
}]);


myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/users',{
      templateUrl: '/templates/users/index.html',
      controller: 'UserListCtr'
    });

    $routeProvider.otherwise({
      redirectTo: '/users'
    });
  }
]);

