'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services', ['ngResource'])
.factory('Records',function($resource) {
    return $resource('/api/records',{}, {
      query : {method: 'GET', params : {}, isArray: true}
    });
});

angular.module('myApp.services')
  .factory('Updater',function($resource) {
    return $resource('/api/:name/:week/:status',{}, {
      update : {method: 'PUT', params : {}, isArray: true}
    });
  });