var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var jwt = require('express-jwt');
var cors = require('cors');
var dotenv = require('dotenv');

var posts = express.Router();

var Firebase = require('firebase');
var myFirebaseRef = new Firebase('https://html5-blog.firebaseio.com/');

dotenv.load();

var authenticate = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use(methodOverride());

var port = process.env.PORT || 4001;

app.get('/', function(req, res) {
    res.status(200).json({
        message: 'welcome to our api!'
    });
});

app.get('/ping', function(req, res) {
    res.status(200).json({
        text: "Resposta OK de método desprotegido!"
    });
});

app.get('/secured/ping', function(req, res) {
    res.status(200).json({
        text: "Resposta OK de método protegido, você está autenticado!"
    });
});

app.use('/secured', authenticate);

app.get('/api', function (req, res) {
    res.status(200).json({
        '/api': [
            '/posts'
        ]
    })
});

posts.get('/posts', function (req, res) {
    myFirebaseRef.on('value', function(snapshot) {
        res.status(200).json(snapshot.val());
    }, function (errorObject) {
        res.send('The read failed: ' + errorObject.code);
    });
});

app.use('/api', posts);

app.listen(port);

console.log('Running in localhost:' + port);