app.controller('loginController', function($scope, $http, localStorageService, $location, $rootScope) {
  // create a message to display in our view
  console.log("loginController Running");
  $rootScope.LoginTF = 0;
  $scope.MessageType = 0;
  $scope.rememberTF = false;
  $scope.localLoginauthUser = localStorageService.get('LoginauthUser');
   if($scope.localLoginauthUser != null){
     console.log("Fill in Email and Password");
     $scope.object = localStorageService.get('LoginauthUser');
     $scope.Email = $scope.object.Email;
     $scope.Password = $scope.object.Password;
     console.log("Email: ", $scope.Email);
     console.log("Password: ", $scope.Password);
     $scope.rememberTF = true;
   }

  $scope.login = function(Email, Password){
    console.log("login function called", Email, Password);
    var data = {"Email": Email, "Password": Password};
    //console.log("remember ", $scope.rememberTF);
    //console.log("data Email: ", data.Email);
    var message="";
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
        $scope.MessageType = 2;
        $scope.Message = "Logging In...";
        localStorageService.set('authUser',data.data);
        $rootScope.authUser = data.data;
        $rootScope.LoginTF = 1;
        //console.log("LoginTF: ", $rootScope.LoginTF);
        $location.path( "/tasks" );
      }
      else
      {
        console.log("Bad Login, AuthToken Cannot be Set");
        $scope.MessageType = 1;
        $scope.Message = "Your Username or password was incorrect. Please Try Again";
      }
    });
  };

  $scope.SignUp = function(){
    $location.path( "/login/signUp" );
  }


});
