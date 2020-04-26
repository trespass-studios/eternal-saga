var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean');
var gulp = require('gulp');
var log = require('fancy-log');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Clean up the dist directory
gulp.task('clean', function () {
  return gulp.src('./dist/*', {read: false})
    .pipe(clean());
});

// Move HTML files to dist
gulp.task('static-files', function () {
  return gulp.src(['./src/*.html'])
    .pipe(gulp.dest('./dist'));
});

// Move asset files to dist
gulp.task('asset-files', function () {
  return gulp.src([
        './images/*.png'
      ],
      { base: './' })
    .pipe(gulp.dest('./dist'));
});

// Uses browserify to bundle JS source
// Converts ES6 to ES5
// Outputs uglified JS and sourcemaps to dist directory
gulp.task('build', function () {
  return browserify({
    entries: './src/index.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    presets: ["@babel/env"],
    sourceType: 'module'
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', log.error)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'))
  .pipe(buffer()); // You need this if you want to continue using the stream with other plugins
});

// gulp start
gulp.task('default', 
  gulp.series(
    'clean',
    'build',
    'static-files',
    'asset-files'));
