angular.module('brixtondd', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ui.router.stateHelper', 'ngAnimate', 'restangular', 'events']);

angular.module('brixtondd')
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://brixtondesignweek.com/publish');
        RestangularProvider.setDefaultHttpFields({cache: true});
        RestangularProvider.setErrorInterceptor(function (resp, deferred, responseHandler) {
            console.log('received error', resp.status, resp, deferred, responseHandler);
            if (resp.status === 401) {
                console.log('Not Authorized', resp.statusText);
                // $http(resp.config).then(responseHandler, deferred.reject);
                deferred.reject('401');

                return false; // error handled
            }
            return true; // error not handled
        });
    })

angular.module('brixtondd')
    .run(function($rootScope) {
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
    })

    // .run(function($rootScope, $state) {
    //     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //         console.log('statechange');
    //         $rootScope.lastState = fromState;
    //         $rootScope.lastParams = fromParams;
    //     });
    // });
