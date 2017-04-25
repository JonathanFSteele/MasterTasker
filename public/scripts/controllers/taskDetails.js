app.controller('taskDetailsController', function($scope, $location, $sce, $http) {
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
});//end of the controller
