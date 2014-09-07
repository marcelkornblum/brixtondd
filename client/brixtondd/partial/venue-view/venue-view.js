angular.module('brixtondd')
    .controller('VenueViewCtrl',function($scope, $rootScope, $stateParams, $anchorScroll, venuesList, zonesList, events){

        $scope.id = $stateParams.id;
        $scope.venue = _.find(venuesList, function(venue) {
            return venue.pk == $scope.id;
        });

        $scope.venue.zone = _.find(zonesList, function(zone) {
            return +$scope.venue.fields.zone === +zone.pk;
        });

        events.getListByVenueId($scope.id)
            .then(function(e) {
                $scope.events = e;
            });

        // $anchorScroll();
    });