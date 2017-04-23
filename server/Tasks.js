var express = require('express');
var authentication = require('express-authentication')
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getTasksList = function(GroupID, UserID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  if(GroupID == 0)
  {
    var query_str = "SELECT * FROM tldb.Tasks_vw WHERE GroupUserID = ?";
    var query_var = [UserID];
  }
  else
  {
    var query_str = "SELECT * FROM tldb.Tasks_vw WHERE GroupID = ? AND GroupUserID = ?";
    var query_var = [GroupID, UserID];
  }
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


//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('Tasks Module Started: ', Date.now())
  next()
})

// define the Users default route
router.get('/', function (req, res) {
  res.send('Tasks')
})

// define the List route
router.get('/List', function (req, res) {
  var result = [];
  console.log("req user record: ",req.authentication);
  var GroupID = req.query.GroupID;
  router.db_getTasksList(GroupID, req.authentication.ID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})


module.exports = router
