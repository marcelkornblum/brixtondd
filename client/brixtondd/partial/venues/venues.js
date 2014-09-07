angular.module('brixtondd')
    .controller('VenuesCtrl',function($scope, venuesList, eventsList, zonesList){
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

        console.log($scope.venues);
    });