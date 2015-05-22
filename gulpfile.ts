/// <reference path="typings/tsd.d.ts"/>

import gulp = require('gulp');
import ts = require('gulp-typescript');

gulp.task('typescript', () => {
  return gulp.src('src/**/*.ts').pipe(ts({
    module: 'commonjs'
  })).pipe(gulp.dest('build/'));
});

gulp.task('jade', () => {
    return gulp.src('src/**/*.jade').pipe(gulp.dest('build/'));
});

gulp.task('config', () => {
    return gulp.src('src/**/*.json').pipe(gulp.dest('build/'));
});

gulp.task('javascript', () => {
    // TODO: Remove from final version.
    return gulp.src('src/**/*.js').pipe(gulp.dest('build/'));
});

gulp.task('default', ['typescript', 'jade', 'config', 'javascript']);
