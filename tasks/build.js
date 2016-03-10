var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var haml = require('gulp-ruby-haml');
var jshint = require('gulp-jshint');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var streamqueue = require('streamqueue')

/**
 * Build a single js file
 **/
gulp.task("build:js:vendor", function () {
    var stream = streamqueue({ objectMode: true });

    stream.queue(
        gulp.src([
          "./layout/js/lib/jquery*.min.js",
          "./layout/js/lib/jquery.gsap.min.js",
          "./layout/js/lib/TweenLite.min.js",
          "./layout/js/lib/TweenMax.min.js",
          "./layout/js/lib/jquery.mask.min.js",
          "./layout/js/lib/d3.min.js",
          "./layout/js/lib/snap.svg-min.js",
          "./layout/js/lib/svgicons-config.js",
          "./layout/js/lib/svgicons.js",
          "./layout/js/lib/underscore-min.js",
          "./layout/js/lib/moment-with-locales.js",
          "./layout/js/lib/moment-duration-format.js",
          "./layout/js/lib/pikaday.js",
          "./layout/js/lib/openapi.js",
          "./layout/js/lib/chosen.jquery.min.js"
        ]).pipe(uglify())
    );
    // once preprocess ended, concat result into a real file
    return stream.done()
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./layout/js/lib/"));

});

gulp.task('build:lint', function() {
  return gulp.src('./layout/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
