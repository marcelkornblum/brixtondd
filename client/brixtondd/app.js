angular.module('brixtondd', ['ui.bootstrap', 'ui.router', 'ui.router.stateHelper', 'restangular', 'events']);

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

    // .config(function ($provide) {
    //     $provide.decorator('$uiViewScroll', function ($delegate) {
    //         return function (uiViewElement) {
    //             // var top = uiViewElement.getBoundingClientRect().top;
    //             window.scrollTo(0, 0);
    //             // Or some other custom behaviour...
    //         };
    //     });
    // });

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


        $rootScope.pageTitle = 'Brixton Design Week';
        $rootScope.pageImage = 'http://brixtondesignweek.com/bdw-logo.gif';
        $rootScope.pageDescription = 'Part of the London Design Festival, the Brixton Design Week 2014 mobile website lists all event details, as well as all designer and venue information.';
        $rootScope.pageUrl = 'http://brixtondesignweek.com';
        $rootScope.pageType = 'website';
    })

    .run(function($rootScope, $state, $window, $timeout) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $window.scrollTo(0,0);
            $timeout(function() {
                $window.scrollTo(0,0);
            }, 200);
        });
    });
