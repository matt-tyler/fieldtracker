'use strict';

/* Directives */


var fieldtrackerDirective = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

fieldtrackerDirective.controller('fieldtrackerCtrl',function($scope,Restangular) {

    var states = ['sufficient','insufficient','absent']

    $scope.changeState = function(index,week) {

      var state = states.indexOf($scope.records[index]["history"][week]);

      if(state + 1  < states.length) {
        $scope.records[index]["history"][week] = states[state+1];
      }
      else {
        $scope.records[index]["history"][week] = states[0];
      }
      var name = $scope.records[index].name
      var status = $scope.records[index]["history"][week];

      Restangular.one("api/name",name).one("week",week).one("status",status).put();
    }

    Restangular.all('api/records').getList().then(function (accounts) {
      $scope.records = accounts;
    });

    $scope.range = [];
    for(var i = 1; i < 54; i++){
      $scope.range.push(i);
    }

    Restangular.one('api/page','').get().then(function (response) {
      $scope.from = parseInt(response.page);
      $scope.listnum = 15;
    });

    $scope.nextPage = function() {
      $scope.from = $scope.from + 15;
      if($scope.from > 38) {
        $scope.from = 38;
      }
      Restangular.one('api/page',$scope.from).put();
    };

    $scope.prevPage = function() {
      $scope.from = $scope.from - 15;
      if($scope.from < 0) {
        $scope.from = 0;
      }
      Restangular.one('api/page',$scope.from).put();
    };
});

fieldtrackerDirective.directive('fieldtracker',function() {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'fieldtrackerCtrl',
      scope: {},
      templateUrl: 'partial/3',
      compile: function(tElement,tAttrs){
        return function link(scope,iElement,iAttrs,ctrl) {
        }
      }
    }
  })
