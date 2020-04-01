const gulp = require('gulp'),
      less = require('gulp-less')
      autoprefixer = require('gulp-autoprefixer')
      browserSync = require('browser-sync')

const paths = {
  html: ['./app/index.html'],
  css: ['./app/css/style.css'],
  script: ['./app/js/script.js']
}

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    port: 8080,
    open: true,
    notify: false
  })
})

gulp.task('less', function () {
  return gulp.src('./app/css/**/*.less')
  .pipe(less())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.reload({stream:true}))
})

gulp.task('html', function () {
  return gulp.src('./app/index.html')
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({stream:true}))
})

gulp.task('watcher', function () {
  gulp.watch('./app/css/**/*.less', gulp.parallel('less'))
  gulp.watch('./app/index.html', gulp.parallel('html'))
})

gulp.task('default', gulp.parallel('watcher', 'browserSync'))