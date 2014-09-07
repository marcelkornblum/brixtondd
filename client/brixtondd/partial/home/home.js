angular.module('brixtondd')
    .controller('HomeCtrl',function($scope, $rootScope, homepage){
        homepage.getList()
            .then(function(h) {
                console.log(h);
                $scope.homepage = h[0];
            });

        $rootScope.pageTitle = 'Welcome to Brixton Design Week';
        // $rootScope.pageDescription = 'All forthcoming events at the Brixton Design Week';
        $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.homepage.fields.daily_image;
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
    });