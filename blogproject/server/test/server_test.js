var app = require('../app');
var request = require('supertest');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.load();

describe('Server API', function () {
  describe('with a unauthenticated user', function () {
    it('returns http status 200 to /ping with json type', function (done) {
      request(app)
        .get('/ping')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });

    it('returns http status 401 to /secured/ping', function (done) {
      request(app)
        .get('/secured/ping')
        .expect(401, done)
    });
  });

  describe('with a authenticate user', function () {
    var token;
    beforeEach(function () {
      var secret = new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64');
      token = jwt.sign({foo: 'bar', aud: process.env.AUTH0_CLIENT_ID}, secret);
    });

    it('returns 200 to /secured/ping', function (done) {
      request(app)
        .get('/secured/ping')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done)
    });
  });

  it('returns CORS headers to OPTIONS request', function (done) {
    request(app)
      .options('/ping')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
      .expect(204, done)
  });
});
