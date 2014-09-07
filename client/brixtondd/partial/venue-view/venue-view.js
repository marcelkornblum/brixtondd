angular.module('brixtondd')
    .controller('VenueViewCtrl',function($scope, $rootScope, $stateParams, $anchorScroll, venuesList, venues, events){

        $scope.id = $stateParams.id;
        $scope.venue = _.find(venuesList, function(venue) {
            return venue.pk == $scope.id;
        });

        events.getListByVenueId($scope.id)
            .then(function(e) {
                $scope.events = e;
            });

        // $anchorScroll();
    });