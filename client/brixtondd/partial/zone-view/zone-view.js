angular.module('brixtondd')
    .controller('ZoneViewCtrl',function($scope, $rootScope){

        $rootScope.pageTitle = 'All Zones';
        $rootScope.pageDescription = 'All zones of the Brixton Design Week festival';
        // $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.venue.fields.photo;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
        // $rootScope.pageType = 'place';

    });