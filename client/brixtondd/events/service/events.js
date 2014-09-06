angular.module('events')
    .factory('events',function($q, $log, Restangular) {
        var resolved,
            collection = [];

        return {
            getList: function() {
                var p = $q.defer();
                if (!resolved) {
                    Restangular.all('events.json').getList()
                        .then(function(r) {
                            collection = r;
                            console.log('evts getlist', collection);
                            p.resolve(collection);
                            resolved = true;
                        }, function(r) {
                            $log.log('SVC:EVENTS:GetList error with code', r);
                            return false;
                        });
                }
                else {
                    p.resolve(collection);
                }
                return p.promise;
            },
            getListByVenueId: function (id) {
                var p = $q.defer();
                this.getList()
                    .then(function(list) {
                        var relevant = _.filter(list, function(item) {
                            return item.fields.venue === +id;
                        });
                        p.resolve(relevant);
                    });
                return p.promise;
            },
            getById: function (id) {
                return _.find(collection, function(e) {
                    return e.pk === +id;
                });
            }
        };
    });