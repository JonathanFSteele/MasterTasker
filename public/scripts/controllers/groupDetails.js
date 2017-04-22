app.controller('groupDetailsController', function($scope, $http, $location) {
  $scope.message = 'This is the group Details Controller';
  console.log($scope.message, $location.search().id);

  $http.get("/api/GroupDetails/ByID?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupDetails response: ",response);
    $scope.DisplayName = response.data[0].DisplayName;
    $scope.Description = response.data[0].Description;
  });

  $http.get("/api/GroupDetails/GroupMembers?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupMembers response: ", response);
    $scope.GroupMembers = response.data;
  });


  $http.get("/api/GroupDetails/Tags?id="+$location.search().id)
  .then(function(response) {
    console.log("Tags response: ", response);
    $scope.Tags = response.data;
  });


  // $scope.Groups = [];


  $scope.submitND = function(DisplayName, Description){
    console.log("submitND function called", DisplayName, Description);
    $scope.data = {"DisplayName": DisplayName, "Description": Description, "ID":$location.search().id };
    console.log("data: ", $scope.data);
    var message="";
    $http.post("/api/GroupDetails/submitND", $scope.data)
    .then(function(response) {
      console.log("SubmitND response: ", response);
      $scope.Tags = response.data;
    });
  };




});
