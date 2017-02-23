var express = require('express')
var app = express()
app.use(express.static('public'))

var dbConfig = require('./dbConfig');

//ROUTES FOR API:
var birds = require('./server/birds') //This is where the js file is.
app.use('/api/birds', birds) //This is the Url.

var contacts = require('./server/contacts') //This is where the js file is.
app.use('/api/contacts', contacts) //This is the Url.

var users = require('./server/users') //This is where the js file is.
users.dbConfig = dbConfig;
app.use('/api/users', users) //This is the Url.

app.listen(3000, function () {
  console.log('Demo app listening on port 3000!')
})
