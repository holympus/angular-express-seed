'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AppCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  })
  .controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  })
  
  
  .controller('MyCtrl2', ['$scope',function ($scope) {
    // write Ctrl here
  }])
 
 
  .controller('LoginCtrl',['$scope','$http','$routeParams', 'LoggedIn', function ($scope,$http,$routeParams,LoggedIn) {
    $scope.state = $routeParams.state || "login";
    $scope.loginForm = {
      username:'',
      password:''
    };
    $scope.LoggedIn = LoggedIn;
    console.log($scope);
    $scope.consoleLoggedIn = function(){
      console.log('loggedin',LoggedIn);
      false; 
    }
  }]);
