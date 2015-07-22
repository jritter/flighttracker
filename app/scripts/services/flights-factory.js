'use strict';

angular.module('flightTracker')
.factory('flightsFactory', function($http, $q, $interval){


  var flights = {};
  var unknown_aircrafts = [];
  var unknown_flight_routes = [];

  flights.flights = [];
  flights.num = 0;


  flights.enrichFlightData = function(data){

    angular.forEach(data, function(d) {
      if (unknown_aircrafts.indexOf(d.hex) === -1){
        $http({
          url: 'http://localhost:3000/aircrafts/by-modes/' + d.hex + '.json',
          method: 'GET',
          cache: true,
        }).success(function(aircraft){
          d.registration = aircraft.registration;
          d.model_fullname = aircraft.model_fullname; 
        }).error(function(){
          unknown_aircrafts.push(d.hex);
          d.registration = "";
          d.model_fullname = "";
        });
      }
    });
    angular.forEach(data, function(d) {
      if (d.flight && unknown_flight_routes.indexOf(d.flight) === -1){
        $http({
          url: 'http://localhost:3000/flight_routes/by-flight/' + d.flight.trim() + '.json',
          method: 'GET',
          cache: true,
        }).success(function(fr){
          d.orig = fr.orig;
          d.dest = fr.dest;
        }).error(function(){
          unknown_flight_routes.push(d.flight);
          d.orig = "";
          d.dest = "";
        });
      }
    });


  };

  flights.getFlightData = function () {
    var deferred = $q.defer();

    $http({
      url: 'http://192.168.1.109/dump/data.json',
      method: 'GET'
    }).success(function(data){
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("error"); 
    });

    return deferred.promise;
  };

  flights.load = function() {
    return $q.when(flights.getFlightData()).then(function(data){
      flights.flights = data;
      flights.num = flights.flights.length;
      flights.enrichFlightData(data);
    });
  };

  flights.getFlightByHex = function(flightHex) {
    var foundFlight = {};
    angular.forEach(flights.flights, function(flight){
      if (flight.hex === flightHex){
        foundFlight = flight;
      }
    });
    return foundFlight;
  };

  flights.load();
  $interval(flights.load, 1000);

  return flights;
});
