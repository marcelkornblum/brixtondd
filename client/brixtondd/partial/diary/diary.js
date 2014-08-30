angular.module('brixtondd')
    .controller('DiaryCtrl',function($scope, events){
        events.getList()
            .then(function (events) {
                $scope.events = events;
            });
    });