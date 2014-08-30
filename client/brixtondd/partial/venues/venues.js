angular.module('brixtondd')
    .controller('VenuesCtrl',function($scope, venuesList, eventsList){
        $scope.venues = venuesList;
        _.each($scope.venues, function (venue) {
            var evts = _.filter(eventsList, function(evt) {
                return +evt.fields.venue === +venue.pk;
            });
            venue.numEvents = evts.length;
            venue.events = evts;
        });
    });