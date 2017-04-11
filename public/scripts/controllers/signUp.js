app.controller('signUpController', function($scope, $http, localStorageService, $location, $rootScope) {
  // create a message to display in our view
  console.log("signUpController Running");
  $scope.MessageType = 0;
  $scope.signUp = function(DisplayName, Email, Password){
    console.log("signUp function called", DisplayName, Email, Password);
    var data = {"DisplayName": DisplayName, "Email": Email, "Password": Password};
    console.log("data: ", data);
    var message="";
    $http.post("/api/SignUp/", data)
    .then(function(data, response) {
      console.log("data: ", data);
      if(data.data.authorizedTF == true)
      {
        console.log("Signing up...");
        $scope.MessageType = 2;
        $scope.Message = "Signing up...";
        $location.path( "/login" );
      }
      if(data.data.authorizedTF == false)
      {
        console.log("Error, Stay on Page!");
        $scope.Message = "That Email already exists. Please Try Again";
        $scope.MessageType = 1;
      }
    });
  };

  $scope.cancel = function(){
    $location.path( "/login" );
  }

});
