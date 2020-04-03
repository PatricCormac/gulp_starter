const {parallel, series, task, src, dest, watch} = require('gulp')
      less = require('gulp-less')
      autoprefixer = require('gulp-autoprefixer')
      browserSync = require('browser-sync')
      imagemin = require('gulp-imagemin')
      uglify = require('gulp-uglify')
      concat = require('gulp-concat')

const paths = {
  html: ['./app/index.html'],
  less: ['./app/css/**/*.less'],
  js: ['./app/js/**/*.js'],
  images: ['./app/images/**/*']
}

task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    port: 8080,
    open: true,
    notify: false
  })
})

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

task('imagemin', function () {
  return src(paths.images)
    .pipe(imagemin())
    .pipe(dest('./dist/images'))
})

task('less', function () {
  return src(paths.less)
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
})

task('minjs', function () {
  return src(paths.js)
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream())
})

task('html', function () {
  return src(paths.html)
    .pipe(dest('./dist'))
    .pipe(browserSync.stream())
})

task('watcher', function () {
  watch(paths.less, series('less'))
  watch(paths.html, series('html'))
  watch(paths.js, series('minjs'))
})

task('default', parallel('html', 'less', 'minjs', 'imagemin', 'watcher', 'browserSync'))