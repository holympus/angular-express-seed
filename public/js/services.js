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


//ALERT SERVICE FOR GLOBAL PAGE ALERTS
.factory('AlertService',[function(){
    var self = this;
    this.alerts = [];
    this.addAlert = function(type,title,msg) {
      //if two params are passed they are type and msg
      msg = msg || title;
      title = msg === title ? '' : title; 
      
      //default type is "warning"
      type = ['success', 'info', 'warning', 'danger'].indexOf(type) >= 0 ? type : "warning"; 
      self.alerts.push({
        type: type,
        msg: msg,
        title: title,
      });
    };
    this.closeAlert= function(index) {
      self.alerts.splice(index, 1);
    };
    return this; 
}])



// SERVICE TO HANDLE LOGGING IN AND OUT And Registering
.factory("LoggedIn",  ['Api', '$location', 'AlertService', function(Api,$location,AlertService){
  var self = this; 
  this.user = {
    username: null,
    first_name: null,
  };
  this.alerts = []; 
  this.status = {
    isLoggedIn: false,
    isLoading: false,
    isError: false,
  }
  this.success = false; 
  
  var setAlert = function(data){
      var alert = {
        msg: data.message,
        type: data.type || 'danger',
        title: data.status,
        stamp: Date.now(),
      }
      self.alerts.push(alert);
  }

  //CLEAR ERRORS
  this.clearAlerts = function(){
    self.message = self.status.isError = null; 
    self.alerts = [];
  }
  
  //LOGIN 
  this.doLogin = function(data){
    self.status.isLoading = true;
    Api.login.save(data, function(data,headers){
      self.user = data.user; 
      setAlert({
        msg: 'You have successfully logged in as ' + data.user.username, 
        type: 'success',
        title: 'Success!'
      });
      self.status = {
        isLoggedIn: data.success,
        isLoading: false,
        isError: !data.success
      };
      self.success = data.success;
    },function(err){
      console.log('loginerr',err);
      self.user = null;
      setAlert({
        msg: err.message, 
        type: 'danger',
        title: err.status,
      });
      self.status = {
        isLoggedIn: false,
        isLoading: false,
        isError: true,
      };   
    });
  };
  
  //LOGOUT
  this.doLogout = function(){
    self.status.isLoading = true; 
    Api.login.delete({},function(){
      self.user = null;
      self.status = {
        isLoggedIn: false,
        isLoading: false,
        isError: false,
      };  
      self.success=false;
      self.clearAlerts();
      setAlert({
        msg: "You are now logged out", 
        type: 'success',
        title: 'Success!' ,
      });
    },function(err){
      setAlert({
        msg: "Server error logging out", 
        type: 'danger',
        title: 'Danger' + err.status + '!' ,
      });
      self.status = {
        isLoggedIn: false,
        isLoading: false,
        isError: true,
      };      
    });
    $location.path('/login');
  }
  

  //init function for startup
  this.init = function(){
    console.log('initializing user', self);
    Api.login.get({},function(data,headers){
      console.log('verified user initiated');
      self.user = data.user; 
      self.status = {
        isLoggedIn: data.success,
        isLoading: false,
        isError: false,
      };  
      self.success = data.success; 
    },function(err){ //not logged in
      self.user = null;
      self.status = {
        isLoggedIn: false,
        isLoading: false,
        isError: false,
      };  
      self.success= false; 
      self.clearAlerts();
    });
  }
 
  return this; 
}])


