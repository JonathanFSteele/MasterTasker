/**
 * @name tasks.js
 * @author Charles Choi - Created: 3/22/17 | LastModified: 4/23/17 - JFS
 * @summary This is the controller for the tasks.js page to allow users to edit and create task/groups.
 * ---------------------------------------------------------------------------
 * @module app.controller tasksController($scope, $http, $location)
 * @function GoToTaskDetails(object)
 * @function CurrentSelectedGroup(ID)
 * @function GoToGroupsDetails()
 * @function getTasks()
 * @function $http.get("/api/Groups/List")
 *  | @function .then(response)
 * ---------------------------------------------------------------------------
 * @description This is the controller for the tasks.js page to allow users to edit and create task/groups.
 * It allows a search functionality and the user to mark off tasks with a checkbox. Users organize their
 * tasks through a group dropdown or they can just display ALL.
 **/
app.controller('tasksController', function($scope, $http, $location) {
  $scope.message = 'This is the tasks Controller';
  console.log($scope.message);

  //Scope Variables
   $scope.Tasks = [];
   $scope.currentGroupID = 0;

  //Initialization of GoToTaskDetails function passing in an object
  $scope.GoToTaskDetails = function(object){
    console.log("tasksController: Going to Current Task Details, ", object);
    if(object == 0)
    {
      $location.path( "/tasks/tasksDetails").search('id=0');
    }
    else
    {
      $location.path( "/tasks/tasksDetails").search('id=' + object.ID);
    }
  }

  //Initialization of CurrentSelectedGroup function passing in an ID
  $scope.CurrentSelectedGroup = function(ID){
    console.log("tasksController: Current Group by ID, ", $scope.currentGroupID);
    $scope.getTasks();
  }

  //Initialization of GoToGroupDetails function
  $scope.GoToGroupsDetails = function(){
    console.log("tasksController: Going to Current Task Details");
    $location.path( "/groups/groupDetails").search('id=0');
  }

  //Initialization of getTasks function //Go to the server ang get the json array.
  $scope.getTasks = function(){
    console.log("tasksController: getTasks function");
    $http.get("/api/Tasks/List?GroupID="+$scope.currentGroupID)
    .then(function(response) {
      console.log("tasksController: Task response, ",response);
      $scope.Tasks = response.data;
    });
  };
  $scope.getTasks();

  //$http.get function passing going to the groups server
  $http.get("/api/Groups/List")
  .then(function(response) {
    console.log("tasksController: Group response, ",response);
    var defaultGroup = {
      "ID":0,
      "DisplayName":"ALL",
      }
    response.data.unshift(defaultGroup);
    console.log("tasksController: Group response, ",response);

    $scope.Groups = response.data;
    $scope.currentGroupID = 0;
  });
});
