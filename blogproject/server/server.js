var http = require('http');
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
  app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use('/secured', authenticate);
  app.use(cors());

  app.use(app.router);
});


app.get('/ping', function(req, res) {
  res.send(200, {text: "Resposta OK de método desprotegido!"});
});

app.get('/secured/ping', function(req, res) {
  res.send(200, {text: "Resposta OK de método protegido, você está autenticado!"});
})

var port = process.env.PORT || 4001;

http.createServer(app).listen(port, function (err) {
  console.log('Server iniciado em http://localhost:' + port);
});
