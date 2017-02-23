	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the main page
			.when('/', {
				templateUrl : 'views/main.html',
				controller  : 'mainController'
			})

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'homeController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'views/contact.html',
				controller  : 'contactController'
			});
	});
