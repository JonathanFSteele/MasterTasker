	// create the module and name it app
	var app = angular.module('app', ['ngRoute', 'LocalStorageModule'])
	.config(['$httpProvider', function ($httpProvider) {
     $httpProvider.interceptors.push('authInterceptorService');
  }]);

	app.controller('mainController', function($scope) {
	  // create a message to display in our view
	  //$scope.message = 'Everyone come and see how good I look!';

	  //$scope.fname = "Jonathan";
	});
