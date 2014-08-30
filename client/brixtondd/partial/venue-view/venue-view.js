angular.module('brixtondd')
    .controller('VenueViewCtrl',function($scope, $stateParams, venues){

        $scope.id = $stateParams.id;
        $scope.venue = venues.getById($scope.id);

    });