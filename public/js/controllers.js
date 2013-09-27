'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AppCtrl', ['$scope', '$http', 'LoggedIn',function ($scope, $http, LoggedIn) {
    
    
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
    
    $scope.LoggedIn = LoggedIn;
    $scope.init = function(){
      LoggedIn.init();
    }
    
    
    $scope.navigation = {
      profile: [
        {
          href: "/profile",
          text: "Profile"
        },
        {
          href: "/logout",
          text: "Logout",
        },
      ],      
    }

    $scope.navbar = {
      isCollapsed: true,
    }
  }])

  
  
  .controller('LogoutCtrl',['$scope','$window','LoggedIn', function($scope,$window,LoggedIn){
    LoggedIn.doLogout();
    $window.history.back();
  }])
  
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
    //idealy will be inherited from AppCtrl
    //$scope.LoggedIn = LoggedIn;
    console.log($scope);
    
    
    $scope.consoleLoggedIn = function(){
      console.log('loggedin',LoggedIn);
      false; 
    }
    
    
  }]);
