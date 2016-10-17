// grab our gulp packages
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	swagger = require('./tasks/swagger.js'),
	watch = require('./tasks/watch.js'); 

// create a default task and just log a message
gulp.task('default', function () {
	return gutil.log('Gulp is running!')
});