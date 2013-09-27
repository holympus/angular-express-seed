'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  
  .controller('AppCtrl', ['$scope', '$http', '$location','LoggedIn',function ($scope, $http, $location,LoggedIn) {   
  
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
    
  }])
  
  
  .controller('NavbarCtrl', ['$scope','$location', function($scope,$location){
    $scope.navbar = {
      isCollapsed: true,
    }
    
    $scope.isActive = function (path) { 
      var location = $location.path();
      var length = path.length;
      
      console.log('active location',location);
      if(length >1)
        return path === location.substr(0,length);
      else
        return path === location;
    };
  }])

  
  
  .controller('LogoutCtrl',['$scope','$window','LoggedIn', function($scope,$window,LoggedIn){
    LoggedIn.doLogout();
    $window.history.back();
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
    
    
  }])
  
  
  
  
  .controller('PositionsCtrl',['$scope',function($scope){
    console.log($scope);
  }])
  
  .controller('CandidatesCtrl',['$scope',function($scope){
    
  }])
    
  .controller('ProfileCtrl',['$scope',function($scope){
    
  }])
