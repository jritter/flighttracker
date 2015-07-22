'use strict';

/**
 * @ngdoc overview
 * @name flightTracker
 * @description
 * # flightTracker
 *
 * Main module of the application.
 */
angular
.module('flightTracker', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      title: '',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
  
  .when('/flights', {
    title: 'Flights',
    templateUrl: 'views/flights.html',
    controller: 'FlightsCtrl',
    controllerAs: 'flightsCtrl'
  })

  .when('/map', {
    title: 'Map',
    templateUrl: 'views/map.html',
    controller: 'MapCtrl',
    controllerAs: 'mapCtrl'
  })

  .when('/about', {
    title: 'About',
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  })
  .otherwise({
    redirectTo: '/'
  });
})

.run(['$location', '$rootScope', function($location, $rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current) {
    if (current.$$route.title === ''){
      $rootScope.title = "FlightTracker";
    }
    else {
      $rootScope.title = "FlightTracker :: " + current.$$route.title;
    }
  });
}])

.controller('NavBarCtrl', function($scope, $location) {

  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };
});
