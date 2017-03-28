	// create the module and name it app
	var app = angular.module('app', ['ngRoute', 'LocalStorageModule'])
	.config(['$httpProvider', function($httpProvider) {
     $httpProvider.interceptors.push('authInterceptorService');
  }]);

	app.controller('mainController', function($scope, $rootScope, $http, localStorageService, $location) {
	  // create a message to display in our view
	  //$scope.message = 'Everyone come and see how good I look!';
		$scope.Logout = function(){
			console.log("Logging out");

			var data = {"Email": " ", "Password": " "};

			$http.post("/api/login/", data)
	    .then(function(data, response) {
				localStorage.clear();
				$rootScope.LoginTF = 0;
				console.log("LoginTF: ", $rootScope.LoginTF);
				$location.path( "#login" );
	    });

		}
	  //$scope.fname = "Jonathan";
	});
