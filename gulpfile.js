var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var log = require('fancy-log');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Uses browserify to bundle source
// Converts ES6 to ES5
// Outputs uglified and sourcemaps to dist
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
gulp.task('default', gulp.series('build'));
