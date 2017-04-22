var express = require('express')
var authentication = require('express-authentication')
var mysql = require("mysql");
var q = require('q');
var router = express.Router()

router.db_FindUser = function(email)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Users_tbl WHERE Email = ?";
  var query_var = [email];
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
}; //end db_FindUser()

// router.db_SetUserToken = function(email, token)
// {
//   var deferred = q.defer(); // Use Q
//   var connection = mysql.createConnection(router.dbConfig);
//   var query_str = "UPDATE tldb.Users_tbl SET AuthToken = ? WHERE Email = ?";
//   var query_var = [token, email];
//   var query = connection.query(query_str, query_var, function (err, rows, fields) {
//       if (err) {
//         deferred.reject(err);
//       }
//       else {
//         deferred.resolve(rows);
//       }
//        connection.end();
//   });
//   return deferred.promise;
// }; //end db_SetUserToken()

router.db_CreateUser = function(displayName, email, password)
{
  console.log("Creating User with passed values of: ", displayName, email, password);
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.Users_tbl (`DisplayName`, `Email`, `Password`) VALUES (?, ?, ?);";
  var query_var = [displayName, email, password];
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

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Signup module started: ', Date.now())
  next()
})

// function guid() {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//     s4() + '-' + s4() + s4() + s4();
// }

// define the home page route
// router.get('/', function (req, res) {
//   res.send('user:' + req.authentication.user);
//   //res.send('Birds home page')
// })

router.post('/', function (req, res) {

  var response = {
    DisplayName: '',
    Email: '',
    Password: '',
    ImageUrl: '',
    authorizedTF: true,
    message: ""
  }
  var badResponse = {
    authToken: null,
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }
  console.log("SignupPostReceived req.body: ",req.body);
  router.db_FindUser(req.body.Email)
   .then(function(rows){
     console.log('Login Post Received Looking up User: ',rows);
     if(rows.length > 0) {
      console.log("User already exists");
      res.send(badResponse);
     }
     else {
       console.log("User does not exist create it...");
       router.db_CreateUser(req.body.DisplayName, req.body.Email, req.body.Password)
       .then(function(setUserRows){
         console.log("Signup Post Received. Setting New Token for User: ", req.body.Email);
         response.message = "Good User and Token Saved";
         res.send(response);
       },function(error){
         console.log(error);
         res.status(500).send(error);
       });
     }
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})

module.exports = router
