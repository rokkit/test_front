var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var sassNotify = {
  title: 'Sass',
  message: 'Done!',
  onLast: true
};

gulp.task('sass', function() {
  gulp.src('./layout/source/sass/general_all.sass')
    .pipe($.compass({
      sass: './layout/source/sass'
    }))
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./build'))
    .pipe($.notify(sassNotify));
});