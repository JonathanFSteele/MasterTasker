	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute', 'LocalStorageModule'])
	.config(['$httpProvider', function ($httpProvider) {
     $httpProvider.interceptors.push('authInterceptorService');
  }]);

	scotchApp.controller('mainController', function($scope) {
	  // create a message to display in our view
	  //$scope.message = 'Everyone come and see how good I look!';

	  //$scope.fname = "Jonathan";
	});
