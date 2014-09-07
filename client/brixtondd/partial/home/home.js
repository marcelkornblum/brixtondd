angular.module('brixtondd')
    .controller('HomeCtrl',function($scope, homepage){
        homepage.getList()
            .then(function(h) {
                console.log(h);
                $scope.homepage = h[0];
            });
    });