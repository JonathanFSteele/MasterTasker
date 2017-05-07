/**
 * @name app.main.js
 * @author Jonathan Frank Steele - Created: 3/12/17 | LastModified: 4/22/17 - JFS
 * @summary Main controller for index.html which holds most of the global variables.
 * ---------------------------------------------------------------------------
 * @module app app.controller 'mainController'
 * @function Logout()
 * 	| @function callback(result)
 * ---------------------------------------------------------------------------
 * @description Main controller for index.html that is connected with index.html and can be used to store
 * $scoped variables and global functions.
 **/

	// create the module and name it app
	var app = angular.module('app', ['ngRoute', 'LocalStorageModule', 'ngAnimate', 'ui.bootstrap', 'ngMaterial', 'ui.gravatar', 'mp.colorPicker'])
	.config(['$httpProvider', function($httpProvider) {
     $httpProvider.interceptors.push('authInterceptorService');
  }]);

	app.controller('mainController', function($scope, $rootScope, $http, localStorageService, $location) {
		console.log("Starting mainController");

		// Root Variables
		$rootScope.authUser = localStorageService.get('authUser');
		$rootScope.currentPath = $location.path();
		console.log("mainController: currentPath, ", $rootScope.currentPath);
		console.log("authUser: ", $rootScope.authUser);
		if($rootScope.authUser == null)
		{
			$scope.Email = "";
		}
		else
		{
			$scope.Email = $rootScope.authUser.Email;
		}


		// Logout Function
		$scope.Logout = function(){
			console.log("Logging out");
			// var confirmTF = confirm("Are you sure you want to Logout?");
			bootbox.confirm({
    		message: "Are you sure you want to Logout?",
    		buttons: {
        	confirm: {
            	label: 'Yes',
            	className: 'btn-warning'
        	},
        	cancel: {
            	label: 'No',
            	className: 'btn-info'
        	}
    		},
    		callback: function (result) {
        	console.log('This was logged in the callback: ' + result);
					if(result == true)
					{
						localStorageService.remove('authUser');
						$rootScope.LoginTF = 0;
						console.log("LoginTF: ", $rootScope.LoginTF);
						$location.path( "/login" );
						if(!$scope.$$phase) $scope.$apply()
					}
    		}
			});
		}

	});
