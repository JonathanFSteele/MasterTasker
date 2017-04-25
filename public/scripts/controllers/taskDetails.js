app.controller('taskDetailsController', function($scope, $location, $sce, $http, $rootScope) {
  // create a message to display in our view
  $scope.message = 'This is the taskDetails Controller';
  $scope.myDate = new Date();
  $scope.googleAddress ='2775 North Roadrunner, Las Cruces, NM 88011';
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


  //Working on this
  $scope.load = function(){
    console.log("Loading load function");
    $http.get("/api/TaskDetails/Task?id="+$location.search().id)
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
    });
  }

  $scope.load();

  $scope.submitND = function(DisplayName, Description){
      console.log("submitND function called", DisplayName, Description);
      var user = $rootScope.authUser.UserID;
      $scope.data = {"DisplayName": DisplayName, "Description": Description, "ID":$location.search().id, "CurrUser": user  };
      console.log("data: ", $scope.data);
      var message="";


      $http.post("/api/TaskDetails/submitND", $scope.data)
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
        $http.post("/api/TaskDetails/deleteGP", $scope.data)
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


});//end of the controller
