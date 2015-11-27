var gulp = require('gulp');

require('./tasks/layout');

gulp.task('default', ['layout:connect', 'layout:sass', 'layout:haml', 'layout:watch']);
