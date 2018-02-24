var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync',function () {
    browserSync.init({
        server: {baseDir:'build'},
        index: 'tab.html'
    })
});

gulp.task('build',function () {
    console.log('build')
    gulp.src(['src/**']).pipe(gulp.dest('build'))
});

gulp.task('watch',function () {
    gulp.watch('src/**',['build']).on('change',browserSync.reload);
});

gulp.task('default',['build','browser-sync','watch'],function () {
    console.log("hello world")
});