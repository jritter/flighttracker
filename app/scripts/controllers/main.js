'use strict';

/**
 * @ngdoc function
 * @name flightTracker.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flightTracker
 */
angular.module('flightTracker')
.controller('MainCtrl', function ($scope, flightsFactory) {
  //$scope.$watch(function() {
  //  return flightsFactory.items;
  //}, function(newVal) {
  //  $scope.numflights = newVal.length;
  //});

  $scope.flightsFactory = flightsFactory;

  $scope.geoSupport = function() {
    if (window.navigator && window.navigator.geolocation) {
      return true;
    } else {
      return false;
    }
  };

  $scope.getLocation = function(){
    window.navigator.geolocation.getCurrentPosition(function(position){
      $scope.position = position;
      $scope.$digest();
    });
  };

  if ($scope.geoSupport()) {
    $scope.getLocation();
  }
});
