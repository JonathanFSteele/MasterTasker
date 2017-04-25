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

// router.post('/', function (req, res) {
//   var response = {
//     TaskName: '',
//     Description: '',
//     TagID: '',
//     Street: '',
//     City: '',
//     State: '',
//     ZipCode: '',
//     ImageUrl: '',
//     message: ""
//   }
//   var badResponse = {
//     authToken: null,
//     message: "Incorrect User Parameters"
//   }
//   console.log("TaskDetailsPostReceived req.TaskName: ",req.TaskName);
//   router.db_CreateTask(req.body.TaskName, req.body.Description, req.body.TagID, req.body.Street, req.body.City, req.body.State, req.body.ZipCode, req.body.ImageUrl)
//   .then(function(setUserRows){
//     //console.log("CreateTask Post Received. Setting New Token for User: ", req.body.Email);
//     //response.message = "Good User and Token Saved";
//     res.send(response);
// });


module.exports = router
