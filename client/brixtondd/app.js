angular.module('brixtondd', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ui.router.stateHelper', 'ngAnimate', 'restangular', 'events']);

angular.module('brixtondd').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('brixtondd').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
