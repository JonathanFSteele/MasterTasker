app.controller('taskDetailsController', function($scope, $location, $sce, $http, $rootScope) {
  // create a message to display in our view
  $scope.message = 'This is the taskDetails Controller';
  $scope.myDate = new Date();
  $scope.Tags = [];
  $scope.currentGroupID = 0;
  // $scope.googleAddress ='2775 North Roadrunner, Las Cruces, NM 88011';
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

  //Working on this
  $scope.load = function(){
    console.log("Loading load function");
    $http.get("/api/taskDetails/Task?id="+$location.search().id)
    .then(function(response) {
      console.log("Task response: ",response.data[0]);
      var TaskDetails = response.data[0];
      $scope.TaskName = TaskDetails.TaskName;
      $scope.Description = TaskDetails.Description;
      $scope.TagID = TaskDetails.TagID;
      $scope.DueDT = TaskDetails.DueDT;
      $scope.Street = TaskDetails.Street;
      $scope.City = TaskDetails.City;
      $scope.State = TaskDetails.State;
      $scope.ZipCode = TaskDetails.ZipCode;
      //$scope.myDate = $scope.DueDT;
      $scope.myDate = $scope.getDate($scope.DueDT);
      $scope.googleAddress = $scope.Street + ', ' + $scope.City + ', ' + $scope.State + ' ' + $scope.ZipCode;
    });
  }

  $scope.load();

  $scope.submitND = function(TaskName, Description, TagID, DueDT, Street, City, State, ZipCode){
      console.log("submitND function called", TaskName, Description, TagID, DueDT, Street, City, State, ZipCode);
      var user = $rootScope.authUser.UserID;
      var id = $location.search().id;
      var date = new Date();
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

$scope.CurrentSelectedGroup = function(ID){
  $scope.currentGroupID = ID;
  console.log("tasksController: Current Group by ID, ", $scope.currentGroupID);
  $scope.getTags();
}

//Initialization of getTasks function //Go to the server ang get the json array.
$scope.getTags = function(){
  console.log("taskDetailsController: getTags function");
  $http.get("/api/TaskDetails/List?GroupID="+$scope.currentGroupID)
  .then(function(response) {
    console.log("taskDetailsController: Tag response, ",response);
    $scope.Tags = response.data;
  });
};

//$http.get function which generates the Tag Dropdown
$http.get("/api/Tags/List")
.then(function(response) {
  console.log("taskDetailsController: Group response, ",response);
  var defaultGroup = {
    "ID":0,
    "DisplayName":"NONE",
    }
  response.data.unshift(defaultGroup);
  console.log("taskDetailsController: Group response, ",response);

  $scope.Tags = response.data;
  $scope.currentGroupID = 0;
});

});//end of the controller
