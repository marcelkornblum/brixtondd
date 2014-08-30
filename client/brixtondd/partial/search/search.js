angular.module('brixtondd')
    .controller('SearchCtrl',function($scope, $q, events, venues, artists, artworks, zones){

        $scope.searchText = '';

        $q.all([events.getList(),
               venues.getList(),
               artists.getList(),
               artworks.getList(),
               zones.getList()])
            .then(function(everything) {
                $scope.events = everything[0];
                $scope.venues = everything[1];
                $scope.artists = everything[2];
                $scope.artworks = everything[3];
                $scope.zones = everything[4];
            });
    });