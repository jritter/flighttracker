'use strict';

angular.module("flightTracker")
  .directive("flightRow", function() {
    return {
      restrict: "A",
      templateUrl: "views/directives/flight-row.html",
      replace: true,
    };
  });
