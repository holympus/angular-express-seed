'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource','ng'])

.value('version', '0.1')

.factory('LoggedInResource', ['$resource' , function($resource){
  this.Login = $resource ("/api/login");
  this.Login.username = '';
  return this.Login; 
}])

.factory("LoggedIn", ['LoggedInResource', '$location', function(resource,$location){
  var self = this; 
  this.first_name = '';
  this.username = '';
  this.success = '';
  this.message = '';
  this.status = ''; 
  
  this.doLogin = function(data){
    var username = data.username;
    resource.save(data, function(data,headers){
      console.log('loggedIn resp',data);
      console.log('headers',headers);
      self.first_name = data.first_name; 
      self.username = username;
      self.success = data.success;
      self.message = data.message;

    },function(err){
      console.log('loginerr',err);
      self.message = err.data; 
      self.status = err.status; 
      self.failed = true; 
      console.log('');
    });
  };
  
  this.doLogout = function(){
    resource.delete({},function(){
      console.log('loggedout success');
    },function(err){
      console.log('loggout backend error', err);
    });
    console.log('starting to log out');
    self.first_name = '';
    self.username = '';
    self.success = '';
    self.message = '';
    self.status = ''; 
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
      self.first_name = data.first_name; 
      self.username = data.username;
      self.success = data.success;
      self.message = data.message || "Successfully Logged In as " + data.username;
      
    },function(err){
      $location.path('/login')
    });
  }
  
  return this; 
}])
// get  => returns userObject
// save => post method, logins in user with {username,password}
// delete => logout user

