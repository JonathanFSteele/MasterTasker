app.controller('groupsController', function($scope, $rootScope, $http, $location, localStorageService) {
  $scope.message = 'This is the groups Controller';
  console.log($scope.message);
   $scope.Groups = [];
   $scope.GoToGroupsDetails = function(object){
     console.log("Going to Current Group Details", object.ID);
     if(object == 0)
     {
       $location.path( "/groups/groupDetails").search('id=0');
     }
     else
     {
       $location.path( "/groups/groupDetails").search('id=' + object.ID);
     }
   }
   
   //CreateNewGroup function
   $scope.CreateNewGroup = function() {
     console.log("groupsController: CreateNewGroup Function Hit");
     bootbox.prompt({
         title: "Enter the Name of your Group",
         inputType: 'text',
         callback: function (result) {
           if(result == null)
           {
             return; //Return when Cancel was clicked so it doesnt create just random empty Tasks
           }
           console.log("groupsController: CreateNewGroup callback result - ", result);
           $scope.newGroup = {'GroupName': result, 'OwnerID': $rootScope.authUser.UserID};
           console.log("groupsController: CreateNewGroup callback result - ", $scope.newGroup);
           //Post for Creating a new Group
           $http.post("/api/Groups/CreateNewGroup", $scope.newGroup)
            .then(function(data, response) {
              console.log("groupsController: .then response data, ", data.data, response);
              $location.path( "/groups/groupDetails").search('id=' + data.data.RowID);
           });
         },
     });
   }
   
  $http.get("/api/Groups/list")
 .then(function(response) {
     console.log("Group response: ",response);
     $scope.Groups = response.data;
   });








});
