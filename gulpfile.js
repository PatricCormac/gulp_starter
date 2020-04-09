let {parallel, task, src, dest, watch} = require('gulp')
      less = require('gulp-less')
      autoprefixer = require('gulp-autoprefixer')
      browserSync = require('browser-sync')
      imagemin = require('gulp-imagemin')
      uglify = require('gulp-uglify')
      concat = require('gulp-concat')
      del = require('del')

const paths = {
  html: ['./app/index.html'],
  less: ['./app/less/**/*.less'],
  js: ['./app/js/**/*.js'],
  images: ['./app/images/**/*']
}

task('clean', async function () {
  del.sync('dist')
})

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
  return src('./app/less/style.less')
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions'],
      cascade: false
    }))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
})

task('minjs', function () {
  return src(paths.js)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream())
})

task('html', function () {
  return src(paths.html)
    .pipe(dest('./dist'))
    .pipe(browserSync.stream())
})

task('watch', function () {
  watch(paths.less, parallel('less'))
  watch(paths.html, parallel('html'))
  watch(paths.js, parallel('minjs'))
})

task('default', parallel('html', 'less', 'minjs', 'imagemin', 'browserSync', 'watch'))