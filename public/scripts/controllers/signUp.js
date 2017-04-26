/**
 * @name signUp.js
 * @author Jonathan F. Steele - Created: 2/22/17 | LastModified: 4/26/17 - JFS
 * @summary This is the Controller for creating a New user.
 * ---------------------------------------------------------------------------
 * @module app.controller('signUpController')
 * @function SignUp(DisplayName, Email, Password)
 *  | @function $http.post("/api/SignUp/", data)
 *    | @function .then(function(data, response))
 * @function cancel() -- Sends user back to login Page
 * ---------------------------------------------------------------------------
 * @description This is the Controller for creating a New user. Allows the user to input an Email, Password, and
 * DisplayName. Will send the user back to the Login Page to login with new created account after filling out
 * all the inputs.
 **/
app.controller('signUpController', function($scope, $http, localStorageService, $location, $rootScope) {
  console.log("signUpController Running");

  //Scope Variables
  $scope.LoginClicked = false;

  //signUp Function
  $scope.signUp = function(DisplayName, Email, Password, ConfirmPassword){
    console.log("signUp function called", DisplayName, Email, Password, ConfirmPassword);
    $scope.LoginClicked = true;
    if(DisplayName == null || Email == null || Password == null || ConfirmPassword == null)
    {
      console.log("signUpController: Nothing was filled in so stay on the Page");
      return;
    }
    if(ConfirmPassword != Password)
    {
      console.log("signUpController: Passwords do not match!");
      return;
    }
    var data = {"DisplayName": DisplayName, "Email": Email, "Password": Password};
    console.log("data: ", data);
    var message="";
    //Create a New User Post
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

  //cancel Function
  $scope.cancel = function(){
    $location.path( "/login" );
  }

});
