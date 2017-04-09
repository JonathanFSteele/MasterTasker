	// configure our routes
	app.config(function($routeProvider) {
		$routeProvider
			// route for the tasks page
			.when('/tasks', {
				templateUrl : 'views/tasks.html',
				controller  : 'tasksController'
			})

			// route for the tasksDetails page
			.when('/tasks/tasksDetails', {
				templateUrl : 'views/tasksDetails.html',
				controller  : 'tasksDetailsController'
			})

			// route for the login page
			.when('/login', {
				templateUrl : 'views/login.html',
				controller  : 'loginController'
			})

			// route for the logins sign up page
			.when('/login/signUp', {
				templateUrl : 'views/signUp.html',
				controller  : 'signUpController'
			})

			// route for the logins forgot password page
			.when('/login/forgotPassword', {
				templateUrl : 'views/forgotPassword.html',
				controller  : 'forgotPasswordController'
			})

			// route for the groups page
			.when('/groups', {
				templateUrl : 'views/groups.html',
				controller  : 'groupsController'
			})

			// route for the groupDetails page
			.when('/groups/groupDetails', {
				templateUrl : 'views/groupDetails.html',
				controller  : 'groupDetailsController'
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
			console.log("next: ",next);
			console.log("current: ", current);
			if(!next)
			{
				console.log("Exiting Route Change because next is undefined");
				return;
			}
			var originalPath = next.$$route.originalPath;
			console.log("Going to: ", originalPath);
			if (originalPath == '/login/forgotPassword' || originalPath == '/login/signUp')
			{
				console.log("Going to forgotPassword page or Sign Up Page");
			}
			else if (!authUser || !authUser.authToken)
			{
				console.log("Redirecting to login page, because authUser does not exist");
				$location.path( "/login" );
			}
			// if(!authUser || !authUser.authToken)
			// {
			// 	console.log("Redirecting to login page, because authUser does not exist");
			// 	$location.path( "/login" );
			// }
    });
});
