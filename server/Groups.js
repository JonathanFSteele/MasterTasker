var express = require('express');
var authentication = require('express-authentication')
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getGroupsList = function(UserID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Groups_vw WHERE GroupUser = ?";
  var query_var = [UserID];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_getGroupsList()


//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('\nGroups Module Started: ', Date.now())
  next()
})

// define the Users default route
router.get('/', function (req, res) {
  res.send('Groups')
})

// define the List route
router.get('/List', authentication.required(), function (req, res) {
  var result = [];
  console.log("\n\n\n\nreq user record: ",req.authentication.ID); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)
 console.log("req.query");
  router.db_getGroupsList(req.authentication.ID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})


module.exports = router
