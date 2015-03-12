var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');
var del = require('del');

function swallowError (error) {

	console.log(error.toString());
	gutil.beep();
	notifier.notify({
		title: 'Gulp Error',
		message: error.toString(),
	});
	this.emit('end');
}

gulp.task('clean', function() {

	del([
		'assets/dist/**',
		'assets/css/**',
	]);

});

gulp.task('scss', function() {
	return gulp.src('assets/scss/**/*')
		.pipe(sass())
		.on('error', swallowError)
		.pipe(prefix("last 3 versions", "> 1%", "ie 8", "ie 9"))
		.on('error', swallowError)
		.pipe(gulp.dest('assets/css'));
});

gulp.task('css', ['scss'], function() {
	return gulp.src(['assets/css/reset.css', 'assets/css/global.css', 'assets/css/**/*'])
		.pipe(concat('all.min.css'))
		// .pipe(minify())
		.pipe(gulp.dest('assets/dist'));
});

gulp.task('watch', function() {
	watch('assets/scss/**/*', function() {
		gulp.start('css');
	});
});

// Default Task
gulp.task('default', [
	'clean',
	'css',
	'watch'
]);
