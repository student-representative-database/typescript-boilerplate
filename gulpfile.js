const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const watchify = require('watchify')
const tsify = require('tsify')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const buffer = require('vinyl-buffer')
const gutil = require('gulp-util')
const ts = require('gulp-typescript')
const paths = {
  pages: ['client/*.html']
}

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['client/main.ts'],
  cache: {},
  packageCache: {}
})
  .plugin(tsify)
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
  })
)

gulp.task('copy-html', function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('public'))
})

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))

    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify()) // Uncomment = minified bundle, comment = browser debugger.
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest('public'))
}

gulp.task('default', ['copy-html'], bundle)
watchedBrowserify.on('update', bundle)
watchedBrowserify.on('log', gutil.log)
