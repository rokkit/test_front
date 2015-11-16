var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var haml = require('gulp-ruby-haml');
var stringify = require('stringify');
var config = require('./config.json');
var babel = require('babelify');

gulp.task('clean', function(cb) {
  del([
    '/build'
  ], cb);
});

gulp.task('connect', function() {
    $.connect.server({ root: 'build', port: 2222, livereload: false });
});

gulp.task('html', function() {
  return gulp.src('./code/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./build'));
});

gulp.task('haml', function () {
  gulp.src('./haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./html'));
});

gulp.task('sass', function() {
  gulp.src('./sass/**/*.sass')
    .pipe($.compass({
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('layout:sass', function() {
  gulp.src('./layout/source/sass/general_all.sass')
    .pipe($.compass({
      css: './layout/css',
      sass: './layout/source/sass'
    }))
    .pipe(gulp.dest('./layout/css'))
    .pipe($.notify('sass : done'));
});

gulp.task('layout:haml', function () {
  gulp.src('./layout/source/haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./layout'))
    .pipe($.notify({ message: "haml : done.", onLast: true }));
});

gulp.task('layout:watch', function() {
  gulp.watch(['./layout/source/haml/**/*.haml'], ['layout:haml']);
  gulp.watch(['./layout/source/sass/*.sass'], ['layout:sass']);
});

function compile(watch) {
  var bundler = watchify(
    browserify('./code/app.js',
      {
        debug: true,
        paths: ['./node_modules', './code/']
      })
    .transform(stringify(['.haml' , '.html']))
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
      .pipe($.notify({ message:'scripts : done', onLast: true }));
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

gulp.task('build', function() { return compile(false); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['clean', 'html', 'watch', 'connect']);

gulp.task('layout', ['layout:sass', 'layout:haml', 'layout:watch']);

// var bundler = _.memoize(function(watch) {
//   var options = {
//     debug: true,
//     paths: ['./node_modules', './']
//   };

//   if (watch) {
//     _.extend(options, watchify.args);
//   }

//   var b = browserify('./app.js', options)
//           .transform(stringify(['.haml']));

//   if (watch) {
//     b = watchify(b);
//   }

//   return b;
// });

// var handleErrors = function() {
//   var args = Array.prototype.slice.call(arguments);
//   delete args[0].stream;
//   glp.util.log.apply(null, args);
//   this.emit('end');
// };

// function bundle(cb, watch) {
//   return bundler(watch).bundle()
//     .on('error', handleErrors)
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(glp.sourcemaps.init({ loadMaps: true }))
//     .pipe(glp.sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist'))
//     .on('end', cb)
//     .pipe(connect.reload());
// }

// gulp.task('scripts', function(cb) {
//   process.env.BROWSERIFYSWAP_ENV = 'dist';
//   bundle(cb, true);
// });

// gulp.task('sayHello', function(){
//   console.log(config.foo);
// });

// gulp.task('build', [
//   'clean',
//   'html',
//   'scripts'
// ]);

// gulp.task('watch', ['build'], function(cb) {
//   bundler(true).on('update', function() {
//     gulp.start('scripts');
//   });

//   gulp.watch(['./src/*.html'], ['html']);
// });

// gulp.task('default', ['connect', 'watch']);