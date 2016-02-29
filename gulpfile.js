var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
  gulp.src(['public/js/**/app.js', 'public/js/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('public/bundle.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'))
});

gulp.task('watch', ['js'], function () {
  gulp.watch('public/js/**/*.js', ['js'])
});