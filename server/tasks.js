var express = require('express');
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getTasksList = function(req)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Tasks_vw";
  // var query_var = [name];
  var query_var; //null
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_getTasksList()


//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('Tasks Module Started: ', Date.now())
  next()
})

// define the users default route
router.get('/', function (req, res) {
  res.send('Tasks')
})

// define the list route
router.get('/list', function (req, res) {
  var result = [];
  console.log("req user record: ",req.authentication); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)
  router.db_getTasksList(req)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})


module.exports = router
