var gulp = require('gulp');

require('./tasks/layout');
require('./tasks/content');
require('./tasks/scripts');
require('./tasks/styles');
require('./tasks/server-html');

gulp.task('build', ['html', 'content', 'sass', 'scripts']);

gulp.task('dev', ['html', 'content', 'sass', 'watch', 'connect']);

gulp.task('layout', ['layout:connect', 'layout:sass', 'layout:haml', 'layout:watch']);

gulp.task('default', ['dev']);