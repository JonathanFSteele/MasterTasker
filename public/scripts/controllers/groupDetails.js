app.controller('groupDetailsController', function($scope, $http, $location, $rootScope) {
  $scope.message = 'This is the group Details Controller';
  console.log($scope.message, $location.search().id);
  //$scope.OwnerID = 0;

  $http.get("/api/GroupDetails/ByID?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupDetails response: ",response);
    $scope.DisplayName = response.data[0].DisplayName;
    $scope.Description = response.data[0].Description;
    $scope.OwnerID = response.data[0].OwnerID;
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




});
