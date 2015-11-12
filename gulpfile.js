var gulp = require('gulp');
var glp = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var connect = require('gulp-connect');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('clean', function(cb) {
  del([
    'app/tmp'
  ], cb);
});

gulp.task('connect', function() {
    connect.server({ root: 'dist', port: 1111, livereload: false });
});

gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(glp.plumber())
    .pipe(gulp.dest('./dist'));
});

var bundler = _.memoize(function(watch) {
  var options = {debug: true};

  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify('./app.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  glp.util.log.apply(null, args);
  this.emit('end');
};

function bundle(cb, watch) {
  return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(glp.sourcemaps.init({ loadMaps: true }))
    .pipe(glp.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  bundle(cb, true);
});

gulp.task('build', [
  'clean',
  'html',
  'scripts'
]);

gulp.task('watch', ['build'], function(cb) {
  bundler(true).on('update', function() {
    gulp.start('scripts');
  });

  gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);