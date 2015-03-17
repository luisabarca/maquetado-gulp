var gulp = require('gulp'),
	less = require('gulp-less'),
	lessminify = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint');

/* Control de errores para mostrar en consola */
function handle_errors(err)
{
	console.log(err.toString());
	this.emit('end');
}


/* Compila LESS */
gulp.task('styles', function()
{
	//.pipe(watch('less/*.less'))
	return gulp.src('./less/*.less')		
		.pipe(less())
		.pipe(lessminify())
   		.pipe(gulp.dest('./css'))
   		.on('error', handle_errors);
});

/* Revisa JS */
gulp.task('scripts', function()
{
	//.pipe(watch('js/*.js'))
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default', {verbose: true}))
		.on('error', handle_errors);
});

/* Sincorniza el navegador */
gulp.task('browser', function () {
   var files = [
      '*.html',
      'js/*.js',
      'css/*.css',
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

/* Loop principal */
gulp.task('loop', function()
{
	gulp.watch('less/*.less', ['styles']);
	gulp.watch('js/*.js', ['scripts']);
});

// Main
gulp.task('default', ['loop', 'browser']);
