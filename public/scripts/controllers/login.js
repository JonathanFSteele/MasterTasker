app.controller('loginController', function($scope, $http, localStorageService, $location) {

  // create a message to display in our view
  console.log("loginController Running");
  $scope.login = function(Email, Password){
    console.log("login function called", Email, Password);
    var data = {"Email": Email, "Password": Password};
    console.log(data);

    var message="";

    $http.post("/api/login/", data)
    .then(function(data, response) {
      console.log("data: ", data);
      if(data.data.authorizedTF)
      {
        console.log("Good Login");
        localStorageService.set('authToken',data.data.authToken);
        $location.path( "/tasks" );
      }
      else
      {
        console.log("Bad Login, AuthToken Cannot be Set");
        $scope.message = "Your Username or password was incorrect. Please Try Again";
      }
    });

  };


});
