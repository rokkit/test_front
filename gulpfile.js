var gulp = require('gulp');


require('./tasks/layout');
require('./tasks/build');

gulp.task('default', ['layout:connect', 'layout:sass', 'layout:haml', 'layout:watch']);
