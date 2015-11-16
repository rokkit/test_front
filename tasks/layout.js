var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var haml = require('gulp-ruby-haml');

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