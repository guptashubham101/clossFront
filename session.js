
ng.module('myApp').provider('session', [
  function() {
    this['$get'] = [
      'cache',
      function(cache) {

        var auth_token = null ;

        var session = {

          setObject: function(key, object) {
            cache(key, object) ;
          },

          getObject: function(key) {
            return cache(key) ;
          },

          setUser: function(user) {
            cache('auth.user', user) ;
          },

          setToken: function(token) {
            cache('auth.token', token) ;
          },

          user: function() {
            return cache('auth.user') ;
          },
          auth_token: function() {
            return cache('auth.token') ;
          },

          setUniversity: function(university) {
            cache('auth.university', university) ;
          },

          university: function() {
            return cache('auth.university') ;
          },

          setCommission: function(commission) {
            cache('auth.commission', commission) ;
          },

          commission: function() {
            return cache('auth.commission') ;
          },

          clear: function() {
            var cachedItems = ['auth.user', 'auth.token',
            'auth.commission', 'degreeList', 'departmentList',
            'departmentObjectsById', 'application.choice','universityConfig',
             'userPermissions'] ;

            angular.forEach(cachedItems, function (item) {
              cache.remove(item) ;
            }) ;

            return this;
          }
        };

        return session;
      }
    ];
  }
]);
