angular.module('brixtondd')
    .controller('DiaryCtrl',function($scope, $rootScope, $state, eventsList){
        $scope.events = _.filter(eventsList, function(evt) {
            return moment(evt.fields.end) > moment();
        });
        $scope.sortField = {
            name:'Date',
            orderBy:'event.start'
        }
        // console.log('diary', eventsList);

        _.each($scope.events, function (evt) {
            evt.fields.startStr = moment(evt.fields.start).format("HH:mm MMM D");
            evt.fields.endStr = moment(evt.fields.end).format("HH:mm MMM D");
        });

        $scope.now = moment().calendar();

        $rootScope.pageTitle = 'All Upcoming Events';
        $rootScope.pageDescription = 'All forthcoming events at the Brixton Design Week';
        // $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.artist.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
    });