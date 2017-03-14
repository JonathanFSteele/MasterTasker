	// configure our routes
	app.config(function($routeProvider) {
		$routeProvider

			// route for the main page
			// .when('/', {
			// 	templateUrl : 'views/main.html',
			// 	controller  : 'mainController'
			// })

			// route for the tasks page
			.when('/', {
				templateUrl : 'views/tasks.html',
				controller  : 'tasksController'
			})

			// route for the tasksDetails page
			.when('/tasksDetails', {
				templateUrl : 'views/tasksDetails.html',
				controller  : 'tasksDetailsController'
			})

			// route for the login page
			.when('/login', {
				templateUrl : 'views/login.html',
				controller  : 'loginController'
			})

			// route for the groups page
			.when('/groups', {
				templateUrl : 'views/groups.html',
				controller  : 'groupsController'
			})

			// route for the userSettings page
			.when('/userSettings', {
				templateUrl : 'views/userSettings.html',
				controller  : 'userSettingsController'
			})

			// route for the contact page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'aboutController'
			});
	}).run(function ($rootScope, $location, localStorageService) { //Insert in the function definition the dependencies you need.
    //Do your $on in here, like this:
    $rootScope.$on("$routeChangeStart",function(event, next, current){
			var authUser = localStorageService.get('authUser');
			console.log("config.route.js: Checking Token", authUser);
			if (!authUser || !authUser.authToken) {
				console.log("Redirecting to login page, because authUser does not exist");
				$location.path( "/login" );
			}
    });
});
