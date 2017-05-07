app.controller('taskDetailsController', function($scope, $location, $sce, $http, $rootScope) {
  // create a message to display in our view
  $scope.message = 'This is the taskDetails Controller';
  $scope.myDate = new Date();
  $scope.Tags = [];
  $scope.Users = [];
  $scope.TaskUsers = [];
  $scope.GroupID = null;
  $scope.currentUser = null;
  $scope.googleAddress = '';
  $scope.getGoogleMapHTML = function(){
    return $sce.trustAsHtml(//'<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVpD1Dv4Y2NqPGJtk-nw6a5OP3WDp72uU&q=2775+North+Roadrunner, Las Cruces, NM 88011"></iframe>'
    '<iframe '
    +'width="600" '
    +'height="450" '
    +'frameborder="0" style="border:0" '
    +'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVpD1Dv4Y2NqPGJtk-nw6a5OP3WDp72uU&q='+$scope.googleAddress+'" allowfullscreen> '
    +'</iframe> '
    );
  };

  $scope.getGoogleMapHTMLRaw = function(){
    return  '<iframe ' //'<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVpD1Dv4Y2NqPGJtk-nw6a5OP3WDp72uU&q=2775+North+Roadrunner, Las Cruces, NM 88011"></iframe>';
    +'width="600" '
    +'height="450" '
    +'frameborder="0" style="border:0" '
    +'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVpD1Dv4Y2NqPGJtk-nw6a5OP3WDp72uU&q='+$scope.googleAddress+'" allowfullscreen> '
    +'</iframe> ';
  };

  $scope.save = function(){
    console.log("Saved: ", $scope.myDate);
    $("#map2").html($scope.getGoogleMapHTMLRaw());
  }

  console.log($location.search().id);

  $scope.getDate = function(date)
  {
    var newDate = new Date();
    console.log("taskDetails: getDate Function date - ", date);
    newDate.setDate((moment(date).toDate()).getDate());
    return newDate;
  }

  $scope.load = function(){
    console.log("Loading load function");
    $http.get("/api/taskDetails/Task?id="+$location.search().id)
    .then(function(response) {
      console.log("Task response: ",response.data[0]);
      var TaskDetails = response.data[0];
      $scope.TaskName = TaskDetails.TaskName;
      $scope.Description = TaskDetails.Description;
      $scope.GroupID = TaskDetails.GroupID;
      $scope.DueDT = TaskDetails.DueDT;
      $scope.Street = TaskDetails.Street;
      $scope.City = TaskDetails.City;
      $scope.State = TaskDetails.State;
      $scope.ZipCode = TaskDetails.ZipCode;
      $scope.myDate = $scope.getDate($scope.DueDT);
      $scope.googleAddress = $scope.Street + ', ' + $scope.City + ', ' + $scope.State + ' ' + $scope.ZipCode;
      $scope.TagID = TaskDetails.TagID;
      $scope.loadtag();
      $scope.loaduser();
      //$scope.myDate = $scope.DueDT;
    });
  }
  $scope.load();

  $scope.loadtag = function(){
    console.log("Loading loadtag function");
    $scope.tagData = {"GroupID": $scope.GroupID};
    console.log("loadtag GroupID", $scope.tagData);
    $http.post("/api/taskDetails/Tags", $scope.tagData)
     .then(function(data, response) {
       console.log("Tags: response, ", data.data);
       var defaultTag = {
         "ID":0,
         "Name":"None",
         "Color": "#ffffff"
         }
       data.data.unshift(defaultTag);
       console.log("tasksController: Tag response, ",data);
       $scope.Tags = data.data;
    });
  }

  $scope.getColorByTagID = function(TagID) {
    console.log("GetColorByTagID Function Called ", TagID);
    var result = $scope.Tags.filter(function (Tag) {
        return Tag.ID === TagID;
      },TagID);
    if(result && result.length > 0) {
      console.log("Tag found", result[0]);
      return result[0].Color;
    } else {
      console.log("Tag not found, returning default color. TagID=", TagID);
      return "#ffffff";
    }
  }

  $scope.loaduser = function(){
    console.log("Loading loaduser function");
    $scope.userData = {"GroupID": $scope.GroupID};
    console.log("loaduser GroupID", $scope.userData);
    $http.post("/api/taskDetails/Users", $scope.userData)
     .then(function(data, response) {
       console.log("Users: response, ", data.data);
      //  var defaultUser = {
      //    "ID":0,
      //    "UserDisplayName":"None",
      //    }
      //  data.data.unshift(defaultUser);
       console.log("tasksController: User response, ",data.data);
       $scope.Users = data.data;
       console.log("Users: ", $scope.Users);
    });
  }

  $scope.TagSelected = function(){
    console.log("Tag Selected Called");
  }

  $scope.UserSelected = function(UserID){
    console.log("User Selected Called: User ID, ",UserID);
    $scope.currentUser = UserID;
  }

  $scope.submitUser = function(){
  var uid = $scope.currentUser;
  console.log("submitUser function called", uid);
  var user = $rootScope.authUser.UserID;
  var id = $location.search().id;
  $scope.data = {'UserID': uid, 'TaskID': id};
  console.log("data: ", $scope.data);
  var message="";

    $http.post("/api/taskDetails/SubmitUser", $scope.data)
     .then(function(data, response) {
     console.log("taskDetails: SubmitUser response, ", data);
     $scope.getTaskMembers();
   });
  };


  $scope.submitND = function(TaskName, Description, TagID, DueDT, Street, City, State, ZipCode){
      console.log("submitND function called", TaskName, Description, TagID, DueDT, Street, City, State, ZipCode);
      var user = $rootScope.authUser.UserID;
      var id = $location.search().id;
      var date = new Date();
      DueDT = $scope.myDate;
      $scope.data = {"TaskName": TaskName, "Description": Description, "LastUpdateUser": user, "LastUpdateDT": date, "TagID": TagID, "DueDT": DueDT, "Street": Street, "City": City, "State": State, "ZipCode": ZipCode, 'ID': id };
      console.log("data: ", $scope.data);
      //console.log("data: ", data);
      var message="";

      $http.post("/api/taskDetails/SubmitND", $scope.data)
       .then(function(data, response) {
       console.log("taskDetails: SubmitND response, ", data);
       $("#map2").html($scope.getGoogleMapHTMLRaw());
       $location.url($location.path())
       $location.path("/task");
        });
    };

    $scope.deleteGP = function(){
        console.log("deleteGP function called");
        var user = $rootScope.authUser.UserID;
        var Owner =$scope.OwnerID;
        var id = $location.search().id;
        console.log("taskDetails: OwnerID within deleteGP, ", $scope.OwnerID);
        $scope.data = {"ID": id };
        console.log("data: ", $scope.data);
        var message="";

        if (user == Owner) {
        $http.post("/api/taskDetails/deleteGP", $scope.data)
         .then(function(data, response) {
         console.log("taskDetails: deleteGP response, ", data);
         $location.url($location.path())
         $location.path("/task");
         })
      }
       else {
         //TODO:  add prompt to say "you cannot delete a group if you are not the leader"
           console.log("You cannot delete a group if you are not the leader");
       }
  };

$scope.back = function(){
  $location.path("/task");
}
$scope.getTaskMembers = function(){
  $http.get("/api/TaskDetails/TaskUsersList?id="+$location.search().id)
  .then(function(response) {
    console.log("TaskUsers response: ", response);
    $scope.TaskUsers = response.data;
  });
}
$scope.getTaskMembers();


// RemoveUser Function
  $scope.RemoveUser = function(UserID) {
  console.log("TaskDetailsController: RemoveUser Function Hit");
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
          console.log("TaskDetailsController: RemoveUser callback result - ", result);
          var TaskID = $location.search().id;
          $scope.oldUserFromTask = {'UserID': UserID, 'TaskID': TaskID};
          console.log("TaskDetailsController: RemoveUser callback scope result - ", $scope.oldUserFromTask);
          //Remove user from task
          $http.post("/api/TaskDetails/RemoveUser", $scope.oldUserFromTask)
          .then(function(data, response) {
            console.log("taskDetails: .then response data, ", data.data, response);
            if(!$scope.$$phase) $scope.$apply()
          });
        }
        $scope.getTaskMembers();
      },
    });
 } // end RemoveUser()


// $scope.CurrentSelectedGroup = function(ID){
//   $scope.currentGroupID = ID;
//   console.log("tasksController: Current Group by ID, ", $scope.currentGroupID);
//   $scope.getTags();
// }
//
// //Initialization of getTasks function //Go to the server ang get the json array.
// $scope.getTags = function(){
//   console.log("taskDetailsController: getTags function");
//   $http.get("/api/TaskDetails/List?GroupID="+$scope.currentGroupID)
//   .then(function(response) {
//     console.log("taskDetailsController: Tag response, ",response);
//     $scope.Tags = response.data;
//   });
// };

//$http.get function which generates the Tag Dropdown
// $http.get("/api/Tags/List")
// .then(function(response) {
//   console.log("taskDetailsController: Group response, ",response);
//   var defaultGroup = {
//     "ID":0,
//     "DisplayName":"None",
//     }
//   response.data.unshift(defaultGroup);
//   console.log("taskDetailsController: Group response, ",response);
//
//   $scope.Tags = response.data;
//   $scope.currentGroupID = 0;
// });

});//end of the controller
