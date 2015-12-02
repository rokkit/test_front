var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var haml = require('gulp-ruby-haml');

var notifySass = {
  title: 'Sass',
  message: 'Compiled',
  onLast: true
}

var notifyHaml = {
  title: 'Haml',
  message: 'Compiled',
  onLast: true
}

gulp.task('layout:connect', function() {
  $.connect.server({ root: 'layout', port: 7777, livereload: false });
});

gulp.task('layout:sass', function() {
  gulp.src('./layout/source/sass/general_all.sass')
    .pipe($.compass({
      css: './layout/css',
      sass: './layout/source/sass',
      font: 'layout/fonts'
    }))
    .pipe(gulp.dest('./layout/css'))
    .pipe($.notify(notifySass));
});

gulp.task('layout:haml', function () {
  gulp.src('./layout/source/haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./layout'))
    .pipe($.notify(notifyHaml));
});

gulp.task('layout:watch', function() {
  gulp.watch(['./layout/source/haml/**/*.haml'], ['layout:haml']);
  gulp.watch(['./layout/source/sass/*.sass'], ['layout:sass']);
});
