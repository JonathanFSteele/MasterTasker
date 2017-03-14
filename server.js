// Nodejs Express Server Initialization
var express = require('express'),
    authentication = require('express-authentication'),
    app = express(),
    mysql = require("mysql"),
    q = require('q');

db_GetUserByToken = function(token)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(dbConfig);
  var query_str = "SELECT * FROM tldb.Users WHERE AuthToken = ?";
  var query_var = [token];
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

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'))
var dbConfig = require('./dbConfig');

app.use(function myauth(req, res, next) {
    // provide the data that was used to authenticate the request; if this is
    // not set then no attempt to authenticate is registered.
    req.challenge = req.get('Authorization');
    console.log("challenge: ", req.challenge);
    db_GetUserByToken(req.challenge)
    .then(function(rows){
      if(rows.length > 0)
      {
        req.authenticated = true;
        req.authentication = rows[0];
      }
      else {
        req.authenticated = false;
        req.authentication = { error: 'INVALID_AUTHORIZATION' };
      }
      console.log("authenticated: ", req.authentication);

      // Continue
      next();
    },function(error){
     console.log(error);
     res.status(500).send(error);
    });
});
//Example of secure authentication page.
app.get('/secret', authentication.required(), function(req, res) {
    res.status(200).send('Hello!');
});

//Start Example Routes for API ~~~ NOTE: Make sure to Comment out birds/contacts as they are from the demo site - JFS
var birds = require('./server/birds'); //This is where the js file is.
app.use('/api/birds', birds); //This is the Url.

var contacts = require('./server/contacts'); //This is where the js file is.
app.use('/api/contacts', contacts); //This is the Url.
//End Example Routes for API

//Start Routes for API

  //Login API
  var login = require('./server/login'); //This is where the js file is.
  login.dbConfig = dbConfig;
  app.use('/api/login', login); //This is the Url.

  //Groups API
  var Groups = require('./server/Groups'); //This is where the js file is.
  Groups.dbConfig = dbConfig;
  app.use('/api/Groups', Groups); //This is the Url.

  //users API for Users_tbl
  var users = require('./server/users'); //This is where the js file is.
  users.dbConfig = dbConfig;
  app.use('/api/users', users); //This is the Url.

//End Routes for API

//Listening Message - To run local serve type ( node server.js ) or ( node server )
app.listen(3000, function () {
  console.log('Local Host for MasterTasker listening on port 3000!');
})
