angular.module('brixtondd')
    .controller('ArtworkViewCtrl',function($scope, $state, $stateParams, artworks){

        $scope.artId = $stateParams.art_id;
        $scope.artwork = artworks.getById($scope.artId);


    });