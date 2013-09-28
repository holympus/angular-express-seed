'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource','ng'])


//CONSTANTS
.value('version', '0.1')



// RESOURCE FOR LOGGED IN USER OBJECT
// get  => returns userObject
// save => post method, logins in user with {username,password}
// delete => logout user
.factory('LoggedInResource', ['$resource' , function($resource){
  this.Login = $resource ("/api/login");
  this.Login.username = '';
  return this.Login; 
}])


// SERVICE TO HANDLE LOGGING IN AND OUT

.factory("LoggedIn", ['LoggedInResource', '$location', function(resource,$location){
  var self = this; 
  self.first_name = self.username = self.success = self.message = self.status = null; 

  console.log(this); 
  //Common Private functions
  var setUserData = function(data){
    console.log(data); 
    if(data !== {} && !!data){
      self.first_name = data.first_name; 
      self.username = data.username;
      self.success = data.success;
      self.message = data.message || "Successfully Logged In as " + data.username;
      self.status = data.status; 
    }else{
      //nullify data
      self.first_name = self.username = self.success = self.message = self.status = null; 
    }
  } 
  
  //init the userdata object
  setUserData(null);
  this.doLogin = function(data){
    var username = data.username;
    resource.save(data, function(data,headers){
      data.username = data.username || username; 
      setUserData(data);
    },function(err){
      console.log('loginerr',err);
      setUserData(err);
    });
  };
  
  this.doLogout = function(){
    resource.delete({},function(){
      console.log('loggedout success');
    },function(err){
      console.log('loggout backend error', err);
    });
    console.log('starting to log out');
    setUserData(null);
    $location.path('/login');
  }
  
  
  // @param function proceed
  this.verifyProceed= function(proceed){
    resource.get({},function(data,headers){
      console.log('verified user, proceeding');
      proceed(); 
    },function(err){
      $location.path('/login')
    });
  }
  
  this.init = function(){
    console.log('initializing user', self);
    resource.get({},function(data,headers){
      console.log('verified user initiated');
      setUserData(data);    
    },function(err){ //not logged in
      setUserData(null);
      $location.path('/login')
    });
  }
  
 
  return this; 
}])


