var express = require('express');
var app  = express();


var routes = require('./config/routes');
app.use(routes);

// set port
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});