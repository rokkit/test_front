var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var compass = require('gulp-compass');

gulp.task('haml', function () {
  gulp.src('./haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./html'));
});

gulp.task('sass', function() {
  gulp.src('./sass/general_all.sass')
    .pipe(compass({
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch(['./haml/**/*.haml'], ['haml']);
  gulp.watch(['./sass/*.sass'], ['sass']);
});

gulp.task('build', ['haml', 'sass']);

gulp.task('default', ['build', 'watch']);