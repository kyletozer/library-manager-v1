var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var maps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var jsmin = require('gulp-minify')
var livereload = require('gulp-livereload')
var clean = require('gulp-clean')
var jshint = require('gulp-jshint')

var srcFolder = './public';
var jsFolder = srcFolder + '/javascripts';
var cssFolder = srcFolder + '/stylesheets';
var destFolder = srcFolder;

// tasks
gulp.task('cleanScripts', cleanScripts)
gulp.task('cleanStyles', cleanStyles)
gulp.task('lintScripts', ['cleanScripts'], lintScripts)
gulp.task('processScripts', ['cleanScripts', 'lintScripts'], processScripts)
gulp.task('processStyles', ['cleanStyles'], processStyles)
gulp.task('watch', ['processScripts', 'processStyles'], watchFiles)
gulp.task('default', ['watch'])

function processScripts() {

  gulp
    .src([
      jsFolder + '/vendor/**/*.js',
      jsFolder + '/**/*.js'
    ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(jsmin({
      ext: {
        min: '.min.js'
      },
      mangle: true
    }))
    .pipe(maps.write('.'))
    .pipe(gulp.dest(jsFolder))
    .pipe(livereload())
}

function processStyles() {

  gulp
    .src(cssFolder + '/main.scss')
    .pipe(maps.init())
    .pipe(rename('main.min.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(maps.write('.', {
      mapFile: function(mapFilePath) {
        return mapFilePath.replace('.min', '')
      }
    }))
    .pipe(gulp.dest(cssFolder))
    .pipe(livereload())
}

function cleanScripts() {

	return gulp.src([
		jsFolder + '/*.js',
		jsFolder + '/*.map'
	], {read: false}).pipe(clean())
}

function cleanStyles() {

	return gulp.src([
		cssFolder + '/*.*',
		'!' + cssFolder + '/*.scss'
	], {read: false}).pipe(clean())
}

function lintScripts() {

  return gulp
    .src([
      jsFolder + '/**/*.js',
      '!' + jsFolder + '/vendor/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'), {
      verbose: true
    })
}

function watchFiles() {

  livereload({
    start: true
  })

  gulp
    .watch(
      jsFolder + '/**/*.js',
      ['processScripts']
    )

  gulp
    .watch(
      cssFolder + '/**/*.scss',
      ['processStyles']
    )
}
