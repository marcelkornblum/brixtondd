angular.module('brixtondd')
    .controller('ArtistsCtrl',function($scope, artistsList, eventsList){
        $scope.artists = artistsList;

        _.each($scope.artists, function (artist) {
            var evts = _.filter(eventsList, function(evt) {
                return _.indexOf(evt.fields.artists, +artist.pk) >= 0;
            });
            artist.numEvents = evts.length;
            artist.events = evts;
        });
    });