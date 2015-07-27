var express = require('express');
var cors = require('cors');
var app = express();

var jwt = require('express-jwt');
var dotenv = require('dotenv');

dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});


app.configure(function () {
  // Request body parsing middleware should be above methodOverride
  app.use(express.bodyParser()); // TODO: add test for it
  app.use(express.urlencoded()); // TODO: add test for it
  app.use(express.json()); // TODO: add test for it


  app.use('/secured', authenticate);
  app.use(cors());

  app.use(app.router);  // TODO: add test for it, maybe delete it
});


app.get('/ping', function(req, res) {
  res.send(200, {text: "Resposta OK de método desprotegido!"});
});

app.get('/secured/ping', function(req, res) {
  res.send(200, {text: "Resposta OK de método protegido, você está autenticado!"});
});

module.exports = app;
