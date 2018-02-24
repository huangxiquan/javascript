const path = require('path');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rollup = require('gulp-rollup');
const sass = require('gulp-sass');

const rollupOptions = {
  format: 'iife',
  plugins: [
    require('rollup-plugin-babel')({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    require('rollup-plugin-node-resolve')(),
    require('rollup-plugin-commonjs')({
      include: 'node_modules/**',
    }),
  ],
  allowRealFiles: true,
};
const minifyHtml = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const assetsInjector = require('gulp-assets-injector')();

const DIST = 'dist';
const isProd = process.env.NODE_ENV === 'production';

gulp.task('clean', () => del(DIST));

gulp.task('css', () => {
  let stream = gulp.src('src/**/style.css', {base: 'src'})
    .pipe(plumber(logError))
    .pipe(sass({importer: importModuleSass}))
    .pipe(postcss([
      precss(),
      autoprefixer(),
      isProd && cssnano(),
    ].filter(Boolean)))
    .pipe(assetsInjector.collect());
  if (!isProd) stream = stream
    .pipe(gulp.dest(DIST));
  if (!isProd) stream = stream
    .pipe(browserSync.stream());
  return stream;
});

gulp.task('js', () => {
  let stream = gulp.src('src/**/*.js');
  stream = stream.pipe(rollup(Object.assign({
    entry: 'src/app.js',
  }, rollupOptions)));
  if (isProd) stream = stream
    .pipe(uglify());
  stream = stream
    .pipe(assetsInjector.collect());
  if (!isProd) stream = stream
    .pipe(gulp.dest(DIST));
  return stream;
});

gulp.task('html', ['css', 'js'], () => {
  let stream = gulp.src('src/**/*.html')
    .pipe(assetsInjector.inject({link: !isProd}));
  if (isProd) stream = stream
    .pipe(minifyHtml({
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeAttributeQuotes: true,
    }));
  return stream
    .pipe(gulp.dest(DIST));
});

gulp.task('copy', () => {
  return gulp.src([
    'src/**',
  ], {base: 'src'})
    .pipe(gulp.dest(DIST));
});

gulp.task('default', ['html', 'copy']);

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('watch-js', ['js'], reload);
gulp.task('watch-html', ['html'], reload);
gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.scss', ['css']);
  gulp.watch('src/**/*.js', ['watch-js']);
  gulp.watch('src/**/*.html', ['watch-html']);
});

gulp.task('browser-sync', ['watch'], () => {
  browserSync.init({
    notify: false,
    open: true,  browser: 'google chrome',
    server: {
      baseDir: DIST,
    },
  });
});

function reload(done) {
  browserSync.reload();
  done && done();
}

function logError(err) {
  gutil.log(err.toString());
  return this.emit('end');
}

function importModuleSass(url, prev, done) {
  return {
    file: url.replace(/^~(\w.*)$/, (m, g) => path.resolve('node_modules', g)),
  };
}
