// translators are functions which translate
// res data into appropriate data structures.
// They can be added to apiProvider via the method translator
// They are only called if the request succeeds and when
// the request method and url pattern matches their own.

ng.module('myApp').provider('api', [
  'config',
  function (config) {
    var translators = [];

    this.translator = function (translator) {
      translators.push(translator);
      return this;
    };

    // declaring like this to avoid minification conflict
    this['$get'] = [
      '$http', '$injector', 'currentUser', '$rootScope',
      function ($http, $injector, currentUser, $rootScope) {
        var patternToRegExp = function (pattern) {
          if (! ng.isArray(pattern)) {
            return patternToRegExp([pattern]);
          }

          return new RegExp([
            '^',
            pattern.map(function (p) {
              return p.replace('*', '[^/]+')+'$';
            }).join('|'),
            '$'
          ].join(''), 'i');
        };

        var resolvedTranslators = translators.map(function (translator) {
          translator = $injector.invoke(translator);

          if (! ng.isFunction(translator.test)) {
            translator.regex = patternToRegExp(translator.pattern);

            translator.test = function (method, url, options) {
              return method === translator.method && translator.regex.test(url);
            };
          }

          return translator;
        });

        var api = function (method, url, options) {

          options = ng.isObject(options) ? options : {} ;

          //console.log(url) ;
          //IS py mentioned in the url? then don't append play to it
          var apiEndpoint =  url.indexOf('/py/') > - 1 ? url : '/play' + url ;


          // URL is complete by itself
          if (url.indexOf('https') > -1 ) {
            options.url = url ;
          } else {
            options.url = 'https://' + currentUser.subDomain  + apiEndpoint ;
          }


          //console.log('URL REQUESTED FOR: ', options.url) ;


          options.method = method;

          options.headers = options.headers || {};

          if(!options.headers.hasOwnProperty('sessionId')) {
            ng.extend(options.headers, {
              'sessionId': currentUser.getAuthToken()
            }) ;
          }

          return $http(options).then(function (res) {
            var data = res.data;

            return data;
          }, function(error) {
            //console.log(error.status, typeof(error.status));
            if(error.status === 401) {
              $rootScope.$broadcast('auto:logout') ;
            }
          });
        };

        ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (method) {
          api[method.toLowerCase()] = function (url, options) {
            return api(method, url, options);
          };
        });

        return api;
      }
    ];
  }
]);
