'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource','ng'])


//CONSTANTS
.value('version', '0.1')



// Resources API service
// get  => returns userObject
// save => post method, logins in user with {username,password}
// delete => logout user or delete a post

//Api service - resources
.factory('Api', ['$resource' , function($resource){
  this.login = $resource ("/api/login");
  this.register = $resource("/api/register");
  return this; 
}])




// SERVICE TO HANDLE LOGGING IN AND OUT And Registering
.factory("LoggedIn", ['Api', '$location', function(Api,$location){
  var self = this; 
  self.first_name = self.username = self.success = self.message = self.status = null; 

  //Common Private functions
  var setUserData = function(data){
    console.log(data); 
    if(data !== {} && !!data){
      self.first_name = data.first_name; 
      self.username = data.username;
      self.success = data.success;
      self.message = data.message || "Successfully Logged In as " + data.username;
      self.status = data.status; 
      self.fail = !!self.status && !self.success;
    }else{
      //nullify data
      self.first_name = self.username = self.success = self.message = self.status = self.fail = null; 
    }
  } 

  
  //init the userdata object
  setUserData(null);
  
  
  //CLEAR ERRORS
  this.clearErrors = function(){
    self.message = self.fail = null; 
  }
  
  //LOGIN 
  this.doLogin = function(data){
    var username = data.username;
    Api.login.save(data, function(data,headers){
      data.username = data.username || username; 
      setUserData(data);
    },function(err){
      console.log('loginerr',err);
      setUserData(err);
    });
  };
  
  //LOGOUT
  this.doLogout = function(){
    Api.login.delete({},function(){
      console.log('loggedout success');
    },function(err){
      console.log('loggout backend error', err);
    });
    console.log('starting to log out');
    setUserData(null);
    $location.path('/login');
  }
  
  
  // verify user before proceeding
  //@param function proceed
  this.verifyProceed= function(proceed){
    Api.login.get({},function(data,headers){
      console.log('verified user, proceeding');
      proceed(); 
    },function(err){
      $location.path('/login')
    });
  }
  
  //init function for startup
  this.init = function(){
    console.log('initializing user', self);
    Api.login.get({},function(data,headers){
      console.log('verified user initiated');
      setUserData(data);    
    },function(err){ //not logged in
      setUserData(null);
      //$location.path('/login')
    });
  }
 
  return this; 
}])


