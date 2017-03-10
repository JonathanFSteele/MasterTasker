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
      console.log("authInterceptorServiceFactory Running...");
      var authInterceptorServiceFactory = {};
//       localStorageService.set('authData', {
//   "authToken": "e55b9ac0-68e5-518c-be53-18221f7f44a5",
//   "authorizedTF": true,
//   "message": ""
// });
      var _request = function(config)
      {
        config.headers = config.headers || {};

        //console.log('add auth header to api call..');
        var authData = localStorageService.get('authData');
        if (authData) {
          config.headers.Authorization = authData.authToken;
        }
        return config;
      }

      var _responseError = function(rejection) {
        if (rejection.status === 401) {
        }
        return $q.reject(rejection);
      }

      authInterceptorServiceFactory.request = _request;
      authInterceptorServiceFactory.responseError = _responseError;

      return authInterceptorServiceFactory;
    }
  ]);
