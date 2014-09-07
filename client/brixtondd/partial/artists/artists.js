angular.module('brixtondd')
    .controller('ArtistsCtrl',function($scope, $rootScope, artistsList, eventsList){
        $scope.artists = artistsList;

        _.each($scope.artists, function (artist) {
            var evts = _.filter(eventsList, function(evt) {
                return _.indexOf(evt.fields.artists, +artist.pk) >= 0;
            });
            artist.numEvents = evts.length;
            artist.events = evts;
            if (!angular.isDefined(artist.fields.thumbnail) || artist.fields.thumbnail == '') {
                artist.fields.thumbnail = 'artistImages/bdw-logo.gif';
            }
        });

        $rootScope.pageTitle = 'All Designers';
        $rootScope.pageDescription = 'All designers participating in the Brixton Design Week';
        // $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.artist.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
    });