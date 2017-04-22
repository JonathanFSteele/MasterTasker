/**
 * @name UserSettings.js <- ServerSide
 * @author Jonathan Loya - Created: 4/16/17 | LastModified: 4/22/17 - JFS
 * @summary Is a list of Query Strings that call the Database to Update & Get for UserSettings.
 * ---------------------------------------------------------------------------
 * @module ~none~
 * @function router.db_getUserAccount(req)
 * @function router.use(timeLog(req, res, next))
 * @function router.get(req, res) @ '/'
 * @function router.get(req, res) @ '/Account'
 * ---------------------------------------------------------------------------
 * @description Is a list of Query Strings that call the Database to Update & Get for UserSettings, this
 * is called when a user would like to change their current info for their profile.
 **/

//Server Requirements and Initialization of Global Variables
var express = require('express');
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getUserAccount = function(req)
{
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Users_tbl";
  // var query_var = [name]; //Use if there are variables in the Query String -Replace- name with an array of needed variables in proper order (seperated by commas).
  var query_var; //null //Use if there are no variables in Query String
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_getUserAccount()

//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('User Module Started: ', Date.now())
  next()
})

//Define the Users default route
router.get('/', function (req, res) {
  res.send('UserSettings')
})

//Define the Account get route
router.get('/Account', function (req, res) {
  var result = [];
  console.log("req user record: ",req.authentication); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)
  router.db_getUserAccount(req)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})


module.exports = router;
