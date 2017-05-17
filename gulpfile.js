var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('scripts', function() {
	console.log("js");
	gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'));
});

gulp.task('styles', function() {
	console.log("sass");
	gulp.src('sass/*.sass')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('imagemin', function() {
	console.log("imagemin");
	gulp.src('img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('assets/img'))
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
  ]))
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('img/*', ['imagemin']);
});

gulp.task('default', [
	'scripts',
	'styles',
	'imagemin',
	'watch'
]);
