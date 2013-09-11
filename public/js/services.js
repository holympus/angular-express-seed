'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

'use strict';

var LoggedIn = function() {
  this.noUser = {
    isUser: null,
    userId: false,
    token: false,
    isManager: null,
    company: null,
    email: null,
    username: null
  };
  return this.data = this.noUser;
};

LoggedIn.prototype.login = function(data) {
  var _this = this;
  return $http.post('/api/user/login', data).success(function(data, status, headers, config) {
    _this.data.isUser = true;
    _this.data.userId = data.userId;
    _this.data.token = data.token;
    _this.data.isManager = data.isManager;
    _this.data.company = data.company;
    _this.data.email = data.email;
    return _this.data.username = data.username;
  }).error(function(data, status, headers, config) {
    return _this.data = _this.noUser;
    $rootScope.$broadcast('login');

  });
};

LoggedIn.prototype.confirm = function() {
  var _this = this;
  return $http.post('/api/user/validate', this.data).success(function(data, status, headers, config) {
    _this.data.isUser = true;
    _this.data.userId = data.userId;
    _this.data.token = data.token;
    _this.data.isManager = data.isManager;
    _this.data.company = data.company;
    _this.data.email = data.email;
    return _this.data.username = data.username;
  }).error(function(data, status, headers, config) {
    _this.logout();
  });
};
LoggedIn.prototype.logout = function(){
  this.data = _this.noUser;
  $rootScope.$broadcast('logout');
  return $location.path("/login");
}

angular.module('myApp.services').service('LoggedIn', LoggedIn);
