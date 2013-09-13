'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
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

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
 
 
  controller('LoginCtrl', function ($scope,$http,$routeParams,LoggedIn) {
    var state = $routeParams.state || "login";
    
    
    //models
    var meta = {title: "Gnopher - Login -" + state }
    var login = {
      'state': state
    };
    var loginForm = {
      username:'',
      password:'',
      success: null,//string
      errors: null,//[{title:'', msg:''}],
    };
    
    
    
    var doLogin = function(){
      var data = {
        "username": loginForm.username,
        "password": loginForm.password
      }
      console.log(data);
      $http.post('/api/login/', data)
      .success(function(data, status, headers, config) {
          login.state = 'success';
          LoggedIn.user = data;
          console.log('loggedIn User',LoggedIn.user)
      }).error(function(data, status, headers, config) {
          login.state = 'login';
          login.errors = data;
          LoggedIn.user = LoggedIn.noUser;
          
      });  
      
    }
    
    $scope.loggedIn = LoggedIn;
    $scope.loginForm = loginForm;
    $scope.login = login;
    $scope.meta = meta;
    $scope.state = state;
    $scope.doLogin = doLogin;
    console.log($scope);
    
    
    
    
  });
