var express = require('express');
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getTaskDetailsByID = function(TaskID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Tasks_tbl WHERE ID=?";
  var query_var = [TaskID];
  //var query_var; //null
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_getTasksList()

router.db_getTasksDescriptionByID = function(TaskID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Tasks_tbl WHERE TaskID=?";
  var query_var = [TaskID];
  //var query_var; //null
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_getGroupsList()

//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('Tasks Module Started: ', Date.now())
  next()
})

// define the Users default route
router.get('/', function (req, res) {
  res.send('GroupMembers')
})

// define the List route
router.get('/ByID', function (req, res) {
  var result = [];
  console.log("req Tasks Details req.query.id: ",req.query.id); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)

  var GroupID = req.query.id;

  router.db_getGroupByID(GroupID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})
// define the List route
router.get('/Task', function (req, res) {
  var result = [];
  console.log("req Task req.query.id: ",req.query.id); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)

  var TaskID = req.query.id;

  router.db_getTaskDetailsByID(TaskID)
   .then(function(data){
     console.log('data result',data);
     res.send(data);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})

router.db_submitND = function(TaskName, Description, LastUpdateUser, LastUpdateDT, TagID, DueDT, Street, City, State, ZipCode, UserID, id)
{
  console.log("updating info in taskDetails: ", TaskName, Description);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Tasks_tbl SET TaskName=?, Description=?, LastUpdateUser=?, LastUpdateDT=?, TagID=?, DueDT=?, Street=?, City=?, State=?, ZipCode=?  WHERE ID=?;";
  var query_var = [TaskName, Description, LastUpdateUser, LastUpdateDT, TagID, DueDT, Street, City, State, ZipCode, id ];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_SetUserToken()

router.db_createND = function(TaskName, Description, LastUpdateUser, LastUpdateDT, TagID, DueDT, Street, City, State, ZipCode, UserID)
{
  console.log("creating info in taskDetails: ", TaskName, Description);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.Tasks_tbl (TaskName, Description, LastUpdateUser, LastUpdateDT, TagID, Street, City, State, ZipCode) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  var query_var = [TaskName, Description, LastUpdateUser, LastUpdateDT, TagID, DueDT, Street, City, State, ZipCode];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_SetUserToken()

router.db_deleteGP = function(id)
{
   console.log("DELETING TASK!!!!!: ", id);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Tasks_tbl SET DeleteDT= ? WHERE ID=?;";
  var query_var = [date, id];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
  if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_SetUserToken()


router.post('/SubmitND', function (req, res) {
  var response = {
    TaskName: '',
    Description: '',
    TagID: '',
    Street: '',
    City: '',
    State: '',
    ZipCode: '',
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }

  if (req.body.ID == 0){
    router.db_createND(req.body.TaskName, req.body.Description, req.body.TagID, req.body.Street, req.body.City, req.body.State, req.body.ZipCode, req.body.CurrUser)
    .then(function(setgrouprows){
      console.log("TaskDetails, creating: req.body items ",req.body);
      console.log("created new task", req.body.Email);
      response.message = "Good User and Token Saved";
      response.TaskName = req.body.TaskName;
      response.Description = req.body.Description;
      response.id = req.body.CurrUser;
      res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
  }
  else {
    router.db_submitND(req.body.TaskName, req.body.Description, req.body.LastUpdateUser, req.body.LastUpdateDT, req.body.TagID, req.body.DueDT, req.body.Street, req.body.City, req.body.State, req.body.ZipCode, req.body.CurrUser, req.body.ID);
    console.log("TaskDetails, submiting: req.body items ",req.body);
    response.message = "Good User and Token Saved";
    response.TaskName = req.body.TaskName;
    response.Description = req.body.Description;
    response.id = req.body.CurrUser;
    res.send(response);
     }
})


router.post('/deleteGP', function (req, res) {
  var response = {
    GroupID: '',
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect Parameters"
  }

    router.db_deleteGP(req.body.ID);
    console.log("TaskDetails, submiting: req.body items ",req.body);
    response.message = "Task is deleted";
    response.GroupID = req.body.ID;
    res.send(response);
})


module.exports = router
