'use strict';

/**
 * @ngdoc function
 * @name flightTracker.controller:FlightsCtrl
 * @description
 * # FlightsCtrl
 * Controller of the flightTracker
 */
angular.module('flightTracker')
  .controller('FilterCtrl', function ($scope, flightsFactory) {
    $scope.flightsFactory = flightsFactory;
  });
