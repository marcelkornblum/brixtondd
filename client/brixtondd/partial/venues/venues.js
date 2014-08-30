angular.module('brixtondd')
    .controller('VenuesCtrl',function($scope, venuesList){
        // venues.getList()
        //     .then(function (venues) {
                $scope.venues = venuesList;
            // });
    });