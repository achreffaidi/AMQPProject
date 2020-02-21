var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Users = require('./api/models/userModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/usersdb'); 
Users.collection.drop();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route


var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(error0, connection) {});


app.listen(port);


console.log('users list RESTful API server started on: ' + port);

