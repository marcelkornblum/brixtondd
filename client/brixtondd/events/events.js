angular.module('events', ['ui.bootstrap','ui.utils','ui.router', 'ui.router.stateHelper','ngAnimate', 'restangular']);

angular.module('events')
    .config(function($stateProvider) {

        /* Add New States Above */

    });

angular.module('events')
    .controller('EventsCtrl',function($scope, $log, $state, $stateParams, eventsList){
        $scope.events = eventsList;
    });