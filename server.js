// Nodejs Express Server Initialization
var express = require('express')
var app = express()
app.use(express.static('public'))
var dbConfig = require('./dbConfig');

//Start Example Routes for API ~~~ NOTE: Make sure to Comment out birds/contacts as they are from the demo site - JFS
var birds = require('./server/birds'); //This is where the js file is.
app.use('/api/birds', birds); //This is the Url.

var contacts = require('./server/contacts'); //This is where the js file is.
app.use('/api/contacts', contacts); //This is the Url.
//End Example Routes for API

//Start Routes for API

  //users API for Users_tbl
  var users = require('./server/users'); //This is where the js file is.
  users.dbConfig = dbConfig;
  app.use('/api/users', users); //This is the Url.

//End Routes for API

//Listening Message - To run local serve type ( node server.js ) or ( node server )
app.listen(3000, function () {
  console.log('Local Host for MasterTasker listening on port 3000!');
})
