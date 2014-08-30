angular.module('brixtondd')
    .controller('ArtistsCtrl',function($scope, artistsList){
        // artists.getList()
        //     .then(function (artists) {
                $scope.artists = artistsList;
            // });

    });