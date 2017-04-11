app.controller('signUpController', function($scope, $http, localStorageService, $location, $rootScope) {
  // create a message to display in our view
  console.log("signUpController Running");
  $scope.signUp = function(DisplayName, Email, Password){
    console.log("signUp function called", Email, Password);
    var data = {"DisplayName": DisplayName, "Email": Email, "Password": Password};
    console.log("data: ", data);
    var message="";
    $http.post("/api/SignUp/", data)
    .then(function(data, response) {
      $location.path( "/login" );
      // console.log("data: ", data);
      // if(data.data.authorizedTF)
      // {
      //   console.log("Good Login");
      //   localStorageService.set('authUser',data.data);
      //   $rootScope.authUser = data.data;
      //   $rootScope.LoginTF = 1;
      //   console.log("LoginTF: ", $rootScope.LoginTF);
      //   $location.path( "/tasks" );
      // }
      // else
      // {
      //   console.log("Bad Login, AuthToken Cannot be Set");
      //   $scope.message = "Your Username or password was incorrect. Please Try Again";
      // }
    });
  };

  $scope.cancel = function(){
    $location.path( "/login" );
  }

});
