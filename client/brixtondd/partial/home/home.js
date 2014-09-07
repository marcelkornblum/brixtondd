angular.module('brixtondd')
    .controller('HomeCtrl',function($scope, $rootScope, $state, homepage){
        homepage.getList()
            .then(function(h) {
                console.log(h);
                $scope.homepage = h[0];

                $rootScope.pageImage = 'http://brixtondesignweek.com/' + $scope.homepage.fields.daily_image;
            });

        $rootScope.pageTitle = 'Welcome to Brixton Design Week';
        // $rootScope.pageDescription = 'All forthcoming events at the Brixton Design Week';
        $rootScope.pageUrl = 'http://brixtondesignweek.com/' + $state.href($state.current);
    });