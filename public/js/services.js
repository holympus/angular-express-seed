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

.factory("LoggedIn", ['LoggedInResource', function(resource){
  var self = this; 
  this.first_name = '';
  this.username = '';
  this.success = '';
  this.message = '';
  this.status = ''; 
  
  this.doLogin = function(data){
      resource.save(data, function(data,headers){
        console.log('loggedIn resp',data);
        console.log('headers',headers);
        self.first_name = data.first_name; 
        self.username = data.username;
        self.success = data.success;
        self.message = data.message;
      },function(err){
        console.log('loginerr',err);
        self.message = err.data; 
        self.status = err.status; 
        self.failed = true; 
        console.log('')
      });
    }
  return this; 
}])
// get  => returns userObject
// save => post method, logins in user with {username,password}
// delete => logout user

