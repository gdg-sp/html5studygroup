var gulp = require('gulp'),
  url = require('url'),
  nodemon = require('nodemon'),
  proxy = require('proxy-middleware'),
  browserSync = require('browser-sync').create();

gulp.task('start-server', function(cb) {

  var started = false;

  return nodemon({
      script: 'server/server.js',
      env: { 'NODE_ENV': 'development' }
    })
    .on('start', function() {
      if (!started) {
        cb();
        started = true;
      }
    })
    .on('restart', function() {
      console.log('restarted!');
    });
});

gulp.task('start-client', ['start-server'], function() {

  var proxyServer = url.parse('http://localhost:3001');
  proxyServer.route = '/api';

  browserSync.init({
    port: 4000,
    ui: {
      port: 4001
    },
    server: {
      baseDir: './web',
      middleware: [proxy(proxyServer)]
    }
  });

  gulp.watch(['./web/**/*.html'], browserSync.reload);
  gulp.watch(['./web/**/*.js'], browserSync.reload);
  gulp.watch(['./web/**/*.css'], browserSync.reload);
});

gulp.task('default', ['start-client']);
