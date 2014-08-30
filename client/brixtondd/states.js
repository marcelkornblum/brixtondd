angular.module('brixtondd')
    .config(function(stateHelperProvider, $urlRouterProvider){
        stateHelperProvider.setNestedState({
            name: 'root',
            templateUrl: 'partial/root/root.html',
            abstract: true,
            controller: 'RootCtrl',
            resolve: {
                venuesList: function(venues) {
                    return venues.getList();
                },
                artistsList: function(artists) {
                    return artists.getList();
                },
                artworksList: function($stateParams, artworks) {
                    return artworks.getList();
                },
                eventsList: function(events) {
                    return events.getList();
                }
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
                    abstract: true,
                    url: '/venues',
                    controller: 'VenuesCtrl',
                    templateUrl: 'partial/abstract.html',
                    children: [
                        {
                            name: 'list',
                            url: '',
                            controller: 'VenuesCtrl',
                            templateUrl: 'partial/venues/venues.html',
                        },
                        {
                            name: 'view',
                            url: '/view/:id',
                            controller: 'VenueViewCtrl',
                            templateUrl: 'partial/venue-view/venue-view.html',
                        }
                    ]
                },
                {
                    name: 'artists',
                    abstract: true,
                    url: '/artists',
                    controller: 'ArtistsCtrl',
                    templateUrl: 'partial/abstract.html',
                    children: [
                        {
                            name: 'list',
                            url: '',
                            controller: 'ArtistsCtrl',
                            templateUrl: 'partial/artists/artists.html',
                        },
                        {
                            name: 'view',
                            url: '/view/:id',
                            controller: 'ArtistViewCtrl',
                            templateUrl: 'partial/artist-view/artist-view.html',
                            children: [
                                {
                                    name: 'art',
                                    url: '/art/:art_id',
                                    controller: 'ArtworkViewCtrl',
                                    templateUrl: 'partial/artwork-view/artwork-view.html'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'search',
                    url: '/search',
                    controller: 'SearchCtrl',
                    templateUrl: 'partial/search/search.html',
                },
                {
                    name: 'events',
                    abstract: true,
                    url: '/events',
                    controller: 'EventsCtrl',
                    templateUrl: 'partial/abstract.html',
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