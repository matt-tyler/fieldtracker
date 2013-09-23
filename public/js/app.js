'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','restangular']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partial/1'});
    $routeProvider.otherwise({redirectTo: '/view1'});
    $locationProvider.html5Mode(true);
  }]);