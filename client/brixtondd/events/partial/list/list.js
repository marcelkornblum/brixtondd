angular.module('events')
    .controller('EventListCtrl',function($scope){


        $rootScope.pageTitle = 'All Events';
        $rootScope.pageDescription = 'All events at the Brixton Design Week';
        // $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.artist.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
    });