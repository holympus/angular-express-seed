'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  
  
  //APP CONTROLLER (PARENT)
  .controller('AppCtrl', ['$scope', '$http', '$location','LoggedIn','AlertService',function ($scope, $http, $location,LoggedIn, AlertService) {   
    $scope.LoggedIn = LoggedIn;
    $scope.AlertService = AlertService;
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
  }])
  
  
  //PositionsCtrl Main View Controller
  .controller('PositionsCtrl',['$scope',function($scope){
    
  }])
  
  
  //CandidatesCtrl Main View Controller
  .controller('CandidatesCtrl',['$scope','Api',function($scope,Api){
    $scope.candidate = Api.testCandidate.get();
    console.log('candidate',Api.testCandidate.get());
    console.log('login', Api.login.get());
  }])


  //ProfileCtrl Main View Controller
  .controller('ProfileCtrl',['$scope',function($scope){
    
  }])
