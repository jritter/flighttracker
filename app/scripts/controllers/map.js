'use strict';

/**
 * @ngdoc function
 * @name flightTracker.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flightTracker
 */
angular.module('flightTracker')
  .controller('MapCtrl', function ($scope, $http) {
    L.mapbox.accessToken = 'pk.eyJ1IjoianJpdHRlciIsImEiOiI1dnN4djFvIn0.CpjDtivgWXdataV9c5Ihxw';
    var map = L.mapbox.map('map', 'jritter.mphb26eo', { zoomControl: false, legendControl: { position: 'topleft' }});

    $http({
      url: 'http://localhost:3000/airports/by-continent/eu.json',
      method: 'GET',
      cache: true,
    }).success(function(geojson){
      map.featureLayer.setGeoJSON(geojson);
    });
  });
