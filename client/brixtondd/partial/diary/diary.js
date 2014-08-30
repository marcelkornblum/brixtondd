angular.module('brixtondd')
    .controller('DiaryCtrl',function($scope, eventsList){
        $scope.events = _.filter(eventsList, function(evt) {
            return moment(evt.fields.end) > moment();
        });
        $scope.sortField = {
            name:'Date',
            orderBy:'event.start'
        }

        _.each($scope.events, function (evt) {
            evt.fields.startStr = moment(evt.fields.start).format("hh:mm MMM D");
            evt.fields.endStr = moment(evt.fields.end).format("hh:mm MMM D");
        });

        console.log($scope.events);

        $scope.now = moment().calendar();
    });