app.controller('groupsController', function($scope, $http, $location) {
  $scope.message = 'This is the groups Controller';
  console.log($scope.message);
   $scope.Groups = [];

   $scope.GoToGroupsDetails = function(object){
     console.log("Going to Current Task Details", object.ID);
     if(object == 0)
     {
       $location.path( "/groups/groupDetails").search('id=0');
     }
     else
     {
       $location.path( "/groups/groupDetails").search('id=' + object.ID);
     }
   }

  //Go to the server ang get the json array.
  $http.get("/api/Groups/list")
  .then(function(response) {
    console.log("Group response: ",response);
    $scope.Groups = response.data;
  });








});