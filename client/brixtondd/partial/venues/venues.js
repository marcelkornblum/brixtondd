angular.module('brixtondd')
    .controller('VenuesCtrl',function($scope, $rootScope, $state, venuesList, eventsList, zonesList){
        $scope.venues = venuesList;
        _.each($scope.venues, function (venue) {
            venue.events = _.filter(eventsList, function(evt) {
                return +evt.fields.venue === +venue.pk;
            });
            venue.zone = _.find(zonesList, function(zone) {
                return +venue.fields.zone === +zone.pk;
            });
            venue.numEvents = venue.events.length;
        });

        $rootScope.pageTitle = 'All Venues';
        $rootScope.pageDescription = 'All venues participating the Brixton Design Week festival';
        // $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.venue.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
        // $rootScope.pageType = 'place';
    });