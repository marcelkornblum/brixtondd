angular.module('brixtondd')
    .controller('ArtistViewCtrl',function($scope, $state, $stateParams, $rootScope, $anchorScroll, artistsList, artworksList, eventsList){
        $scope.id = +$stateParams.id;
        $scope.artist = _.find(artistsList, function(artist) {
            return artist.pk == $scope.id;
        });

        $scope.events = _.filter(eventsList, function(evt) {
            return _.indexOf(evt.fields.artists, $scope.id) >= 0;
        });


        $rootScope.pageTitle = $scope.artist.fields.name;
        $rootScope.pageDescription = $scope.artist.fields.description;
        $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.artist.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
        $rootScope.pageType = 'person';

        // $anchorScroll();
    });