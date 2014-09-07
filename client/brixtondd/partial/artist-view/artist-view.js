angular.module('brixtondd')
    .controller('ArtistViewCtrl',function($scope, $stateParams, $anchorScroll, artistsList, artworksList, eventsList){
        $scope.id = +$stateParams.id;
        $scope.artist = _.find(artistsList, function(artist) {
            console.log('testing' , artist.pk, $scope.id);
            return artist.pk == $scope.id;
        });

        // console.log($scope.id, $scope.artist, artistsList);

        $scope.events = _.filter(eventsList, function(evt) {
            return _.indexOf(evt.fields.artists, $scope.id) >= 0;
        });

        // $anchorScroll();
    });