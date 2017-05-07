/**
 * @name userSettings.js
 * @author Jonathan Steele - Created: 4/22/17 | LastModified: 4/22/17 - JFS
 * @summary Is the userSettings controller that allows functionality to be added to the userSettings html.
 * ---------------------------------------------------------------------------
 * @module app.controller 'userSettingsController'
 * @function ChangeName(DisplayName)
 *  | @function post("/api/SignUp/", data).then(data, response)
 * @function ChangePassword(OldPassword, NewPassword, ConfirmNewPassword)
 *  | @function post("/api/UserSettings/UpdatePassword", $scope.NewauthUserPass).then(data, response)
 * @function DeleteUser()
 * ---------------------------------------------------------------------------
 * @description Is the userSettings controller allows functionality to be added to the userSettings html. It
 * also allows $scope variables to created which will then allowed to be used in the html.
 **/

app.controller('userSettingsController', function($scope, $rootScope, $http, localStorageService, $location) {
  console.log("Running UserSettings Controller");

	//Root Scope Variables
	$rootScope.authUser = localStorageService.get('authUser');

  //Scope Variables
  $scope.message = 'Change your display name, profile image, or password here';
  $scope.userInfo = localStorageService.get('authUser');
  $scope.Email = $scope.userInfo.Email;
  $scope.DisplayName = $scope.userInfo.DisplayName;
  $scope.Password = $scope.userInfo.Password;

  $scope.ChangeName = function(DisplayName) {
    console.log("userSettings: ChangeName Called");
    //console.log("userSettings: ChangeName function hit passing in (" + DisplayName + ") - If value is undefined then use current Name (" + $scope.DisplayName + ")"); //Only for Debug
    $scope.NewauthUser = localStorageService.get('authUser');

    if(DisplayName == null)
    {
        $scope.NewauthUser.DisplayName = $scope.DisplayName;
    }
    else
    {
        $scope.NewauthUser.DisplayName = DisplayName;
    }
    //console.log("userSettings: NewauthUser, ", $scope.NewauthUser); //For Debug
    $http.post("/api/UserSettings/UpdateDisplayName", $scope.NewauthUser)
    .then(function(data, response) {
      console.log("userSettings: Change Name Post .then return data ", data.data);
      localStorageService.set('authUser', data.data);
      location.reload();
      if(!$scope.$$phase) $scope.$apply()
    });
  }

  $scope.ChangePassword = function(OldPassword, NewPassword, ConfirmNewPassword) {
    console.log("userSettings: ChangePassword Called", OldPassword, NewPassword, ConfirmNewPassword);
    $scope.NewauthUserPass = localStorageService.get('authUser');
    if(OldPassword != $scope.NewauthUserPass.Password)
    {
      console.log("userSettings: Wrong Old Password!");
      //TODO: Have an alert to tell the user that they typed in the wrong Old Password.
    }
    else if(NewPassword == null || ConfirmNewPassword == null)
    {
      console.log("userSettings: Please enter a New Password");
      //TODO: Have an alert to tell the user that They Put a new Password of NULL.
    }
    else if(NewPassword != ConfirmNewPassword)
    {
      console.log("userSettings: New Password does not match up with Confirm New Password!");
      //TODO: Have an alert to tell the user that they Their New Passwords do not match.
    }
    else {
      console.log("userSettings: Looks Good Changing your Password Now");
      $scope.NewauthUserPass.Password = NewPassword;
      //console.log("userSettings: NewauthUser, ", $scope.NewauthUserPass); //For Debug
      //TODO: Set up a PopUp to tell the User that its changing their password (Loading...)
      $http.post("/api/UserSettings/UpdatePassword", $scope.NewauthUserPass)
      .then(function(data, response) {
        console.log("userSettings: ChangePassword Post .then return data ", data.data);
        //TODO: Set up a PopUp to tell the User That the Password has been changed, Make sure to put a wait time so their is plenty of time to see the message
        localStorageService.remove('authUser');
        $location.path("/login");
      });
    }
  }
  
  // Account Deletion
  $scope.DeleteUser = function(){
    console.log("Delete User Function Called...");
    //TODO: Set up Functionality for a PermaDelete for a Users Account..
    
    //copied from logout code
    // var confirmTF = confirm("Are you sure you want to delete your account?");
    bootbox.confirm({
        message: "Are you sure you want to delete your account?",
        buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-danger'
          },
          cancel: {
              label: 'No',
              className: 'btn-info'
          }
        },
        callback: function (result) {
          console.log('This was logged in the callback: ' + result);
          if(result == true)
          {
            console.log('User account being deleted...');
            $scope.NewauthUserPass = localStorageService.get('authUser');
            //console.log(">>>>>>NewauthUserPassID=", $scope.NewauthUserPass.UserID);
            localStorageService.remove('authUser');
            $rootScope.LoginTF = 0;
            console.log("LoginTF: ", $rootScope.LoginTF);
            $http.post("/api/UserSettings/DeleteUser", $scope.NewauthUserPass)
            .then(function(data, response) {
              console.log("userSettings: DeleteUser Post .then return data ", data.data);
              localStorageService.remove('authUser');
              $location.path("/login");
              if(!$scope.$$phase) $scope.$apply()
            });
          }
        }
    });
  }

}); //close app controller
