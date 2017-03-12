'use strict';
console.log("Before authIntercepterServiceFactory");
/**
 * @ngdoc service
 * @name tcgApp.authInterceptorService
 * @description
 * # authInterceptorService
 * Factory in the tcgApp.
 */
 angular.module('app')
  .factory('authInterceptorService', ['$q', '$location', 'localStorageService', '$injector', '$window',
    function($q, $location, localStorageService, $injector, $window) {
      var authInterceptorServiceFactory = {};
//       localStorageService.set('authToken', {
//   "authToken": "e55b9ac0-68e5-518c-be53-18221f7f44a5",
//   "authorizedTF": true,
//   "message": ""
// });
      var _request = function(config)
      {
        //console.log("authInterceptorServiceFactory Intercepted. Config: ", config);
        config.headers = config.headers || {};

        //console.log('add auth header to api call..');
        var authUser = localStorageService.get('authUser');
        //console.log("authToken: ", authUser.authToken);
        if (authUser && authUser.authToken) {
          //console.log("Before Config Headers Authorization: ", config.headers.Authorization);
          config.headers.Authorization = authUser.authToken;
          //console.log("After Config Headers Authorization: ", config.headers.Authorization);
        }
        else {
          $location.path( "/login" );
        }
        console.log("authInterceptorServiceFactory Intercepted & Adjusted. Config: ", config);
        return config;
      }

      var _responseError = function(rejection) {
        if (rejection.status === 401) {
          $location.path( "/login" );
        }
        return $q.reject(rejection);
      }

      authInterceptorServiceFactory.request = _request;
      authInterceptorServiceFactory.responseError = _responseError;

      return authInterceptorServiceFactory;
    }
  ]);
