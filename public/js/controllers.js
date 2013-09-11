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
  controller('LoginCtrl', function ($scope,$http,$routeParams,loggedIn) {
    var state = $routeParams.state || "login";
    $scope.meta = {title: "Gnopher - Login -" + state }
    
    $scope.login = {
      'state': state
    };
    
    $scope.loginform = {
      username:'',
      password:'',
      success: null,//string
      errors: null,//[{title:'', msg:''}],
    };
    
    $scope.doLogin = function(data){
          data = {
            "isUser" : "val",
            "userId" : "val",
            "token" : "val",
            "isManager" : "val",
            "company" : "val",
            "email" : "val",
            "username" : "val",
            
          }
          loggedIn.user.isUser = data.isUser;
          loggedIn.user.userId = data.userId;
          loggedIn.user.token = data.token;
          loggedIn.user.isManager = data.isManager;
          loggedIn.user.company = data.company;
          loggedIn.user.email = data.email;
          loggedIn.user.username = data.username;
          
          //logged in!  now refresh
      
      // $http.post('/api/user/validate', this.data)
      // .success(function(data, status, headers, config) {
      //     loggedIn.user.isUser = data.isUser;
      //     loggedIn.user.userId = data.userId;
      //     loggedIn.user.token = data.token;
      //     loggedIn.user.isManager = data.isManager;
      //     loggedIn.user.company = data.company;
      //     loggedIn.user.email = data.email;
      //     loggedIn.user.username = data.username;
      // }).error(function(data, status, headers, config) {
      //     loggedIn.user = loggedIn.noUser;
      // });
      
    }
    
  });
