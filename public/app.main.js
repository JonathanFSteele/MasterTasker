	// create the module and name it app
	var app = angular.module('app', ['ngRoute', 'LocalStorageModule', 'ngMaterial'])
	.config(['$httpProvider', function($httpProvider) {
     $httpProvider.interceptors.push('authInterceptorService');
  }]);

	app.controller('mainController', function($scope, $rootScope, $http, localStorageService, $location) {
		// Root Variables
		$rootScope.authUser = localStorageService.get('authUser');

		// Logout Function
		$scope.Logout = function(){
			console.log("Logging out");
			// var confirmTF = confirm("Are you sure you want to Logout?");
			bootbox.confirm({
    		message: "Are you sure you want to Logout?",
    		buttons: {
        	confirm: {
            	label: 'Yes',
            	className: 'btn-info'
        	},
        	cancel: {
            	label: 'No',
            	className: 'btn-warning'
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
