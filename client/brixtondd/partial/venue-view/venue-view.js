angular.module('brixtondd')
    .controller('VenueViewCtrl',function($scope, $stateParams, venues, events){

        $scope.id = $stateParams.id;
        $scope.venue = venues.getById($scope.id);

        events.getListByVenueId($scope.id)
            .then(function(e) {
                $scope.events = e;
            });
    });