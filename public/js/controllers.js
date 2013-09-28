'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  
  
  //APP CONTROLLER (PARENT)
  .controller('AppCtrl', ['$scope', '$http', '$location','LoggedIn',function ($scope, $http, $location,LoggedIn) {   
    $scope.LoggedIn = LoggedIn;
    $scope.init = function(){
      LoggedIn.init();
    }
    $scope.navigation = {
      profile: [
        { href: "/profile",
          text: "Profile"
        },
        { href: "/logout",
          text: "Logout",
        },
      ],      
    }
  }])
  
  
  //NAV BAR CONTROLLER
  .controller('NavbarCtrl', ['$scope','$location', function($scope,$location){
    $scope.navbar = {
      isCollapsed: true,
    }
    
    $scope.isActive = function (path) { 
      var location = $location.path();
      var length = path.length;
      if(length >1)
        return path === location.substr(0,length);
      else
        return path === location;
    };
  }])

  
  
  //LogoutCtrl  Main View Controller
  .controller('LogoutCtrl',['$scope','$window','LoggedIn', function($scope,$window,LoggedIn){
    LoggedIn.doLogout();
  }])
 
  //LoginCtrl  Main View Controller
  .controller('LoginCtrl',['$scope','$http','$routeParams', 'LoggedIn', function ($scope,$http,$routeParams,LoggedIn) {
    $scope.state = $routeParams.state || "login";
    $scope.loginForm = {
      username:'',
      password:''
    };    
    $scope.consoleLoggedIn = function(){
      console.log('loggedin',LoggedIn);
      false; 
    }
  }])
  
  
  
  //PositionsCtrl Main View Controller
  .controller('PositionsCtrl',['$scope',function($scope){
    
  }])
  
  
  //CandidatesCtrl Main View Controller
  .controller('CandidatesCtrl',['$scope',function($scope){
    
  }])


  //ProfileCtrl Main View Controller
  .controller('ProfileCtrl',['$scope',function($scope){
    
  }])
