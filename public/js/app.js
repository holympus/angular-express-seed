'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngResource',
  'ng',
  'ui.bootstrap'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: 'partials/register',
      controller: 'LoginCtrl'
    }).
    when('/logout', {
      templateUrl: 'partials/logout',
      controller: 'LogoutCtrl',
    }).
    when('/candidates', {
      templateUrl: 'partials/candidates',
      controller: 'CandidatesCtrl',
    }).
    when('/candidates/:candidateId', {
      templateUrl: 'partials/candidate',
      controller: 'CandidateCtrl',
    }).
    when('/positions', {
      templateUrl: 'partials/positions',
      controller: 'PositionsCtrl',
    }).
    when('/profile', {
      templateUrl: 'partials/profile',
      controller: 'ProfileCtrl',
    }).
    otherwise({
      redirectTo: '/login'
    });

  $locationProvider.html5Mode(true);
});


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
