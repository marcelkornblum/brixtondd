angular.module('brixtondd')
    .controller('ArtistViewCtrl',function($scope, $stateParams, artistsList, artworksList, eventsList){
        $scope.id = +$stateParams.id;
        $scope.artist = _.find(artistsList, function(artist) {
            return artist.pk = $scope.id;
        });

        $scope.artworks = _.filter(artworksList, function(art) {
            return _.indexOf(art.fields.artist, $scope.id) >= 0;
        });

        $scope.events = _.filter(eventsList, function(evt) {
            return _.indexOf(evt.fields.artists, $scope.id) >= 0;
        });
    });