/**
 * @name login.js
 * @author Jonathan F. Steele - Created: 2/20/17 | LastModified: 4/26/17 - JFS
 * @summary This is the controller for logging in to the website, it will check and see if the user exists...
 * ---------------------------------------------------------------------------
 * @module app.controller('loginController')
 * @function login(Email, Password)
 *  | @function $http.post("/api/Login/", data)
 *    | @function .then(function(data, response))
 * @function SignUp()
 * ---------------------------------------------------------------------------
 * @description This is the controller for logging in to the website, it will check and see if the user exists
 * by checking the database. It will give any users logged in a authentication token. The user also has the
 * choice to allow the browser to remember the users information.
 **/
app.controller('loginController', function($scope, $http, localStorageService, $location, $rootScope) {
  console.log("loginController Running");

  //root Scope Variables
  $rootScope.LoginTF = 0; //Used within Index to Hide the Header

  //Scope Variables
  $scope.rememberTF = false;
  $scope.ErrorMessage = "";
  $scope.BadLogin = false; //Used for Errors on the html Page
  $scope.localLoginauthUser = localStorageService.get('LoginauthUser');
   if($scope.localLoginauthUser != null){
     console.log("Fill in Email and Password");
     $scope.object = localStorageService.get('LoginauthUser');
     $scope.Email = $scope.object.Email;
     $scope.Password = $scope.object.Password;
     $scope.rememberTF = true;
   }

  //login Function
  $scope.login = function(Email, Password){
    console.log("login function called", Email, Password);
    var data = {"Email": Email, "Password": Password};
    if(Email == null || Password == null)
    {
      $scope.BadLogin = true; //Used for Errors on the html Page
      $scope.ErrorMessage = "All Input fields need to be filled out properly!";
      return;
    }
    else {
      //Login Post
      $http.post("/api/Login/", data)
      .then(function(data, response) {
        console.log("data: ", data);
        if(data.data.authorizedTF)
        {
          console.log("Good Login");
          if($scope.rememberTF == true)
          {
            //console.log("Save Login authUser", data.data);
            localStorageService.set('LoginauthUser', data.data);
          }
          else
          {
            //console.log("Clear Login authUser");
            localStorageService.remove('LoginauthUser');
          }
          $scope.IncorrectInputTF = 1;
          console.log("Logging In...");
          localStorageService.set('authUser',data.data);
          $rootScope.authUser = data.data;
          $scope.BadLogin = false; //Used for Errors on the html Page
          $rootScope.LoginTF = 1;
          //console.log("LoginTF: ", $rootScope.LoginTF);
          $location.path( "/tasks" );
        }
        else
        {
          console.log("Bad Login, AuthToken Cannot be Set");
          $scope.ErrorMessage = "Your Username or password was incorrect. Please Try Again";
          $scope.BadLogin = true; //Used for Errors on the html Page
          return;
        }
      });
    }
  };

  //SignUp Function
  $scope.SignUp = function(){
    $location.path( "/login/signUp" );
  }


});
