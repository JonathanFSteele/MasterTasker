app.controller('groupDetailsController', function($scope, $http, $location, $rootScope) {
  $scope.message = 'This is the group Details Controller';
  console.log($scope.message, $location.search().id);
  $scope.userDataID = $rootScope.authUser.UserID;
  //$scope.OwnerID = 0;

  $http.get("/api/GroupDetails/ByID?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupDetails response: ",response);
    $scope.DisplayName = response.data[0].DisplayName;
    $scope.Description = response.data[0].Description;
    $scope.OwnerID = response.data[0].OwnerID;
  });

$scope.getGroupMembers = function(){
  $http.get("/api/GroupDetails/GroupMembers?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupMembers response: ", response);
    $scope.GroupMembers = response.data;
  });
}
$scope.getGroupMembers();

$scope.getTags = function(){
  $http.get("/api/GroupDetails/Tags?id="+$location.search().id)
  .then(function(response) {
    console.log("Tags response: ", response);
    $scope.Tags = response.data;
  });
}
$scope.getTags();
  // $scope.Groups = [];


  $scope.submitND = function(DisplayName, Description){
      console.log("submitND function called", DisplayName, Description);
      var user = $rootScope.authUser.UserID;
      $scope.data = {"DisplayName": DisplayName, "Description": Description, "ID":$location.search().id, "CurrUser": user  };
      console.log("data: ", $scope.data);
      var message="";


      $http.post("/api/GroupDetails/submitND", $scope.data)
       .then(function(data, response) {
       console.log("groupDetails: SubmitND response, ", data);
       $location.url($location.path())
       $location.path("/groups");
        });
    };

    $scope.deleteGP = function(){
        console.log("deleteGP function called");
        var user = $rootScope.authUser.UserID;
        var Owner =$scope.OwnerID;
        var id = $location.search().id;
        console.log("groupDetails: OwnerID within deleteGP, ", $scope.OwnerID);
        $scope.data = {"ID": id };
        console.log("data: ", $scope.data);
        var message="";

        if (user == Owner) {
        $http.post("/api/GroupDetails/deleteGP", $scope.data)
         .then(function(data, response) {
         console.log("groupDetails: deleteGP response, ", data);
         $location.url($location.path())
         $location.path("/groups");
         })
      }
       else {
         //TODO:  add prompt to say "you cannot delete a group if you are not the leader"
           console.log("YOU AINT ALLOWED TO TOUCH THAT, STAAAAAAHHHHHP");
       }
  };

  $scope.back = function(){
    $location.path("/groups");
  }

  // AddUserToGroupDialog Function
		$scope.AddUserToGroupDialog = function() {
    console.log("groupsController: AddUserToGroupDialog Function Hit");
      bootbox.prompt({
      title: "Enter the email of the user you would like to add:",
      inputType: 'text',
      callback: function (result) {
        if(result == null)
        {
          return; //Return when Cancel was clicked so it doesnt create just random empty actions
        }
        var Owner =$scope.OwnerID;
        var user = $rootScope.authUser.UserID;
        if (user == Owner) {
        console.log("groupsController: AddUserToGroupDialog callback result - ", result);
        var groupID = $location.search().id;
        $scope.newUserToGroup = {'EmailName': result, 'GroupID': groupID};
        console.log("groupsController: AddUserToGroupDialog callback newresult - ", $scope.newUserToGroup);

        //Get for adding new user to group
        $http.post("/api/GroupDetails/AddUserToGroupFind", $scope.newUserToGroup)
        .then(function(data, response) {
          console.log("groupDetails: .then response data, ", data.data, response);
          $scope.getGroupMembers();
          if(!$scope.$$phase) $scope.$apply()
        });
      }
      else {
      //TODO:  add prompt to say "you cannot remove a group member if you are not the leader"
        console.log("YOU AINT ALLOWED TO TOUCH THAT, STAAAAAAHHHHHP");
      }
      },
    });
   } // end AddUserToGroupDialog()

  // RemoveUserFromGroupDialog Function
		$scope.RemoveUserFromGroupDialog = function(userID) {
    console.log("groupsController: RemoveUserFromGroupDialog Function Hit");
      bootbox.confirm({
        message: "Are you sure you want to remove this user?",
        buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-warning'
          },
          cancel: {
              label: 'No',
              className: 'btn-info'
          }
        },
        callback: function (result) {
          if(result == true)
          {
            console.log("groupsController: RemoveUserFromGroupDialog callback result - ", result);
            var groupID = $location.search().id;
            $scope.oldUserFromGroup = {'UserID': userID, 'GroupID': groupID};
            console.log("groupsController: RemoveUserFromGroupDialog callback scope result - ", $scope.oldUserFromGroup);

            //Remove user from group
            var Owner =$scope.OwnerID;
            var user = $rootScope.authUser.UserID;
            if (user == Owner) {
            $http.post("/api/GroupDetails/RemoveUserFromGroup", $scope.oldUserFromGroup)
            .then(function(data, response) {
              console.log("groupDetails: .then response data, ", data.data, response);
              if(!$scope.$$phase) $scope.$apply()
            });
            $scope.getGroupMembers();
            }
            else {
            //TODO:  add prompt to say "you cannot remove a group member if you are not the leader"
              console.log("YOU AINT ALLOWED TO TOUCH THAT, STAAAAAAHHHHHP");
            }
          }
        },
      });
   } // end RemoveUserFromGroupDialog()

   $scope.myvar = "this is not bold.";

   //AddTag Function
   $scope.AddTag = function(){
     console.log("Add function Called");
     $scope.newTag = {'Name': $scope.newTag.Name, 'Color': $scope.newTag.Color, 'GroupID': $location.search().id};
     console.log("Add", $scope.newTag);
     $http.post("/api/GroupDetails/AddTag", $scope.newTag)
     .then(function(data, response) {
       console.log("groupDetails: .then response data, ", data.data, response);
       $scope.getTags();
       $scope.newTag = {'Name': '', 'Color': '#db6f20'};
     });
   }

   //SaveTag Function
   $scope.SaveTag = function(tag){
     console.log("Save function Called");
     $scope.SavedTag = {'Name': tag.Name, 'Color': tag.Color, 'ID': tag.ID};
     console.log("Add", $scope.SavedTag);
     $http.post("/api/GroupDetails/SaveTag", $scope.SavedTag)
     .then(function(data, response) {
       console.log("GroupDetail: Save .then response data, ", data.data, response);
       $scope.getTags();
     });
   }

   //RemoveTag Function
   $scope.RemoveTag = function(tag){
     console.log("Remove Tag function Called");
     $scope.TagRemoval = {'ID': tag.ID};
     console.log("Removing: ", $scope.TagRemoval);
     $http.post("/api/GroupDetails/RemoveTag", $scope.TagRemoval)
     .then(function(data, response) {
       console.log("groupDetails RemoveTag: .then response data, ", data.data, response);
       $scope.getTags();
     });
   }

});
