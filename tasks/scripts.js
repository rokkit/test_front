var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var stringify = require('stringify');
var babel = require('babelify');

var scriptsNotify = {
  title: 'Scripts',
  message: 'Done!',
  onLast: true
};

function compile(watch) {
  var bundler = watchify(
    browserify('./code/app.js',
      {
        debug: true,
        paths: ['./node_modules', './code/']
      })
    .transform(stringify(['.haml']))
    .transform(babel)
    );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./build'))
      .pipe($.notify(scriptsNotify));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('scripts', function() { return compile(); });

gulp.task('watch', function() { return watch(); });