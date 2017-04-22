/**
 * @name authinterceptorservice.js
 * @author Jonathan Frank Steele - Created: 3/5/17 | LastModified: 4/22/17 - JFS
 * @summary When called will check if current logged on user is authenticated.
 * ---------------------------------------------------------------------------
 * @module .factory authInterceptorService
 * @function _request(config)
 * @function _responseError(rejection)
 * ---------------------------------------------------------------------------
 * @description authInterceptorService inside the Master Tasker, When called it will check to see if the
 * current user has proper authentication to be logged in, If used does not have proper authentication than
 * that user will be thrown to the login page.
 **/

'use strict';
 angular.module('app')
  .factory('authInterceptorService', ['$q', '$location', 'localStorageService', '$injector', '$window',
    function($q, $location, localStorageService, $injector, $window) {
      console.log("Running authInterceptorService");

      /*Global Variables*/
      var authInterceptorServiceFactory = {};

      /*Initializing of _request function (Called once)*/
      console.log("authInterceptorService: initializing(Called once)");
      var _request = function(config)
      {
        console.log("authInterceptorServiceFactory Intercepted. Config: ", config);
        config.headers = config.headers || {};
        var authUser = localStorageService.get('authUser');
        //console.log("authToken: ", authUser.authToken);
        if (config.url.startsWith("views/"))
        {
          return config;
        }
        else if (authUser && authUser.authToken) {
          config.headers.Authorization = authUser.authToken;
        }
        else
        {
          $location.path( "/login" );
        }
        return config;
      }

      /*Initializing of _responseError function (Called once)*/
      var _responseError = function(rejection) {
        if (rejection.status === 401) {
          $location.path( "/login" );
        }
        return $q.reject(rejection);
      }

      authInterceptorServiceFactory.request = _request;
      authInterceptorServiceFactory.responseError = _responseError;
      console.log("authInterceptroService: Done initializing. ready to Use");
      return authInterceptorServiceFactory;
    }
  ]);
