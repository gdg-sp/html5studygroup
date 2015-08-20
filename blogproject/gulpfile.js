var
  gulp = require('gulp'),
  nodemon = require('nodemon'),
  browserSync = require('browser-sync').create(),
  connect = require('gulp-connect');


gulp.task('say_hello', function(){
  console.log("hello world");
});


gulp.task('start-server', function () {
  return nodemon({
    script: 'server/server.js'
  //, ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('start-client', function() {
  connect.server({
    root: 'web',
    port: 9000,
    livereload: true
  });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:9000",
        port: 4000,
        ui: {
          port: 4001
        }
    });
});

gulp.task('html', function () {
  gulp.src('./web/*.html')
    .pipe(connect.reload());
});
gulp.task('css', function () {
  gulp.src('./web/*.css')
    .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src('./web/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./web/**/*.html'], ['html']);
  gulp.watch(['./web/**/*.css'], ['css']);
  gulp.watch(['./web/**/*.js'], ['js']);
});


gulp.task("serve", ["start-client", "start-server", "browser-sync"], function(){return});


gulp.task('default', ["say_hello", "serve", "watch"], function() {return});
