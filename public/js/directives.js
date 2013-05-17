'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
/*
directive('', function factory() {
  var directiveDefinitionObject = {
      scope: {

      },
      compile:
  function compile(tElement, tAttrs, transclude) {

    return function (scope, element, attrs) {
    }
  }
};
return directiveDefinitionObject;
})
  */