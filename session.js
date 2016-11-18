var myApp = angular.module('myApp', [])
myApp.service('session', function () {
  
  this['$get'] = [
    'cache',
    function(cache) {
      
      var auth_token = null ;
      
      var session = {
        setToken: function(token) {
          cache('auth.token', token) ;
        },
        
        
        auth_token: function() {
          return cache('auth.token') ;
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
});
