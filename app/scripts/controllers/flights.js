'use strict';

/**
 * @ngdoc function
 * @name flightTracker.controller:FlightsCtrl
 * @description
 * # FlightsCtrl
 * Controller of the flightTracker
 */
angular.module('flightTracker')
  .controller('FlightsCtrl', function ($scope, flightsFactory) {
    $scope.flightsFactory = flightsFactory;

    $scope.filterLonLat = function(element) {
      return !(element.lat === 0 && element.lon === 0 && flightsFactory.filterLonLat);
    };

    $scope.filterFlightNo = function(element) {
      return !(element.flight === "" && flightsFactory.filterFlightNo);
    };

    this.showFlightDetails = function(flight) {
      $scope.currentFlight = flightsFactory.getFlightByHex(flight);
      $("#modalFlight").modal();
    };
  });
