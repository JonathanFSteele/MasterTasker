var express = require('express');
var mysql = require("mysql");
var q = require('q');

var router = express.Router();

//SQL Query functions:
router.db_getUserList = function()
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Users";
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
}; //end db_getUserList()


//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('User Module Started: ', Date.now())
  next()
})

// define the users default route
router.get('/', function (req, res) {
  res.send('users')
})

// define the list route
router.get('/list', function (req, res) {
  var result = [];

  router.db_getUserList()
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
   });
})


module.exports = router
