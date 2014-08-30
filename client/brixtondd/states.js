angular.module('brixtondd')
    .config(function(stateHelperProvider, $urlRouterProvider){
        stateHelperProvider.setNestedState({
            name: 'root',
            templateUrl: 'partial/root/root.html',
            abstract: true,
            // url: '',
            controller: 'RootCtrl',
            resolve: {
                // authorize: function(authorization) {
                //     return authorization.authorize();
                // },
            },
            children: [
                {
                    name: 'home',
                    url: '/home',
                    controller: 'HomeCtrl',
                    templateUrl: 'partial/home/home.html',
                },
                {
                    name: 'diary',
                    url: '/diary',
                    controller: 'DiaryCtrl',
                    templateUrl: 'partial/diary/diary.html',
                },
                {
                    name: 'venues',
                    url: '/venues',
                    controller: 'VenuesCtrl',
                    templateUrl: 'partial/venues/venues.html',
                },
                {
                    name: 'artists',
                    url: '/artists',
                    controller: 'ArtistsCtrl',
                    templateUrl: 'partial/artists/artists.html',
                },
                {
                    name: 'events',
                    abstract: true,
                    url: '/events',
                    controller: 'EventsCtrl',
                    templateUrl: 'events/partial/events.html',
                    children: [
                        {
                            name: 'list',
                            url: '',
                            controller: 'EventListCtrl',
                            templateUrl: 'events/partial/list/list.html',
                        },
                        {
                            name: 'view',
                            url: '/view/:id',
                            controller: 'EventViewCtrl',
                            templateUrl: 'events/partial/view/view.html',
                        }
                    ]
                },
            ]
        });

        $urlRouterProvider.otherwise('/home');
    });