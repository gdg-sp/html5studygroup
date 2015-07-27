var http = require('http');
var app = require('./app');

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('Server iniciado em http://localhost:' + port);
});
