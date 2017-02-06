var gulp = require('gulp');
var jshint = require('gulp-jshint');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var src = './public';
var stylesPath = src + '/stylesheets';


var jsDirs = [
  './*.js',
  './models/**/*.js',
  './public/**/*.js',
  './routes/**/*.js'
];


gulp.task('lint-scripts', lintScripts);
gulp.task('compile-sass', compileSass);
gulp.task('watch', ['compile-sass'], watch);
gulp.task('reload', reload);
gulp.task('default', ['watch']);


function lintScripts() {

  gulp
    .src(jsDirs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

function compileSass() {

  gulp
    .src(stylesPath + '/main.scss')
    .pipe(maps.init())
    .pipe(rename('main.min.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(maps.write('.', {
      mapFile: function(mapFilePath) {
        return mapFilePath.replace('.min', '');
      }
    }))
    .pipe(gulp.dest(stylesPath))
    .pipe(livereload());
}

function reload() {

  gulp
    .src('.')
    .pipe(livereload());
}

function watch() {

  livereload({ start: true });

  gulp.watch(jsDirs, ['lint-scripts']);
  gulp.watch(stylesPath + '/**/*.scss', ['compile-sass']);
  gulp.watch('./views/**/*.html', ['reload']);
}
