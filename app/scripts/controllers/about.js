'use strict';

/**
 * @ngdoc function
 * @name flightTracker.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flightTracker
 */
angular.module('flightTracker')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
