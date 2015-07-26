'use strict';

/**
 * @ngdoc function
 * @name flightTracker.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flightTracker
 */
angular.module('flightTracker')
  .controller('MapCtrl', function ($scope, $http, flightsFactory) {
    
    $scope.flightsFactory = flightsFactory;

    // initialize the map...
    var accessToken = 'pk.eyJ1IjoianJpdHRlciIsImEiOiI1dnN4djFvIn0.CpjDtivgWXdataV9c5Ihxw';
    var mapId = 'jritter.mphb26eo';

    var map = L.map('map').setView([46.94, 7.46], 9);
    L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + mapId + '/{z}/{x}/{y}.png?access_token=' + accessToken).addTo(map);

    map.setZoom(9);

    // handling the airports on the map...

    var airportsLayer = {};
    var airportIcon = L.divIcon({
      html: '<i class="fa fa-dot-circle-o fa-2x"></i>'
    });

    $http({
      url: 'http://localhost:3000/airports/by-continent/eu.json',
      method: 'GET',
      cache: true,
    }).success(function(geojson){
      airportsLayer = L.geoJson(geojson, {
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, { icon: airportIcon }).on('mouseover', function(){
            this.bindPopup(feature.properties.name).openPopup();
          }); 
        },
      });
      map.addLayer(airportsLayer);
    });

    // display the airport layer only in certain
    // zoomlevels
    map.on('zoomend', function() {
      if (map.getZoom() > 7){
        map.addLayer(airportsLayer);
      }
      else {
        map.removeLayer(airportsLayer);
      }
    });


    var flightsLayer = {};
    // handling the aircrafts on the map...
    $scope.$watch('flightsFactory.geojson', function() {
      if (flightsFactory.geojson !== {}){
        map.removeLayer(flightsLayer);
        flightsLayer = L.geoJson(flightsFactory.geojson, {
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng, { 
              icon: L.divIcon({
                html: '<i class="fa fa-plane fa-2x" style="transform: rotate(' + (315 + feature.properties.track) % 360 + 'deg); color: black"></i>'
              })
            });
          },
        });
      map.addLayer(flightsLayer);
      }
    });
  });
