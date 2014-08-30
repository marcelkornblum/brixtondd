angular.module('events')
    .controller('EventViewCtrl',function($scope, $stateParams, events){
        $scope.id = $stateParams.id;
        $scope.evt = events.getById($scope.id);
        console.log($scope.evt);
    });