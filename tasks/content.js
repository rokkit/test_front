var gulp = require('gulp');

var contentNotify = {
  title: 'Content',
  message: 'Done!',
  onLast: true
};

gulp.task('images', function(){
  return gulp.src('./layout/images/**/*.*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('fonts', function(){
  return gulp.src('./layout/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('video', function(){
  return gulp.src('./layout/video/**/*.*')
    .pipe(gulp.dest('./build/video'));
});

gulp.task('content', ['images', 'fonts', 'video']);