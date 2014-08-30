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
            getById: function (id) {
                return _.find(collection, function(e) {
                    return e.pk === +id;
                });
            }
        };
    });