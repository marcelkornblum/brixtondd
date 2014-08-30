angular.module('events')
    .factory('artworks',function($q, $log, Restangular) {
        var resolved,
            collection = [];

        return {
            getList: function() {
                var p = $q.defer();
                if (!resolved) {
                    Restangular.all('artworks.json').getList()
                        .then(function(r) {
                            collection = r;
                            p.resolve(collection);
                            resolved = true;
                        }, function(r) {
                            $log.log('SVC:ARTWORKS:GetList error with code', r);
                            return false;
                        });
                }
                else {
                    p.resolve(collection);
                }
                return p.promise;
            },
            getListById: function (id) {
                var p = $q.defer();
                this.getList()
                    .then(function(list) {
                        var relevant = _.filter(list, function(item) {
                            return _.indexOf(item.fields.artist, +id) >= 0;
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