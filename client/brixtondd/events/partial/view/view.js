angular.module('events')
    .controller('EventViewCtrl',function($scope, $rootScope, $state, $stateParams, $anchorScroll, eventsList, artistsList, venuesList){
        $scope.id = +$stateParams.id;
        $scope.evt = _.find(eventsList, function(evt) {
            return evt.pk == $scope.id;
        });
        // console.log('find evt', $scope.id, $scope.evt, eventsList);

        $scope.artists = _.filter(artistsList, function(artist) {
            return _.indexOf($scope.evt.fields.artists, artist.pk) >= 0;
        });

        $scope.venue = _.find(venuesList, function(venue) {
            return $scope.evt.fields.venue === venue.pk;
        });

        $scope.venuePage = function venuePage(id) {
            $state.go('root.venues.view', {id: id, back: 'root.events.view({id:' + $scope.id + '})'});
        };

        $scope.evt.fields.startStr = moment($scope.evt.fields.start).format("HH:mm MMM D");
        $scope.evt.fields.endStr = moment($scope.evt.fields.end).format("HH:mm MMM D");


        $scope.dlIcal = function dlIcal() {
            var icsMSG = "BEGIN:VCALENDAR\nVERSION:1.0\nBEGIN:VEVENT\nDTSTART:" + moment($scope.evt.fields.start).format('YYYYMMDDThhmmss') + "\nDTEND:" + moment($scope.evt.fields.end).format('YYYYMMDDThhmmss') + "\nLOCATION:" + $scope.venue.fields.address + "\nSUMMARY:" + $scope.evt.fields.name + "\nDESCRIPTION:" + $scope.evt.fields.description + "\nPRIORITY:3\nEND:VEVENT\nEND:VCALENDAR";
            window.open( "data:text/calendar;charset=utf8," + escape(icsMSG));
        };

        $rootScope.pageTitle = $scope.evt.fields.name;
        $rootScope.pageDescription = $scope.evt.fields.description;
        // $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.artist.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
        $rootScope.pageType = 'event';


        // $anchorScroll();
    });