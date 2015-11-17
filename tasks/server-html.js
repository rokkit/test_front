var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('connect', function() {
  $.connect.server({ root: 'build', port: 4444, livereload: false });
});

gulp.task('html', function() {
  return gulp.src('./code/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./build'));
});