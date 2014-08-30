angular.module('brixtondd')
    .controller('ArtistViewCtrl',function($scope, $stateParams, artists, artworksList){
        $scope.id = $stateParams.id;
        $scope.artist = artists.getById($scope.id);
        $scope.artworks = artworksList;
    });