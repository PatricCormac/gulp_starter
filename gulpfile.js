let {parallel, task, src, dest, watch} = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    
    src_html = './src/index.html',
    src_less = './src/less/**/*.less',
    src_js = './src/js/**/*.js',
    src_img = './src/img/**/*';

task('clean', async function () {
  del.sync('dist');
});

task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    port: 8080,
    open: true,
    notify: false
  });
});

function browserSyncReload(done) {
  browsersync.reload();
  done();
};

task('imagemin', function () {
  return src(src_img)
    .pipe(imagemin())
    .pipe(dest('./dist/img'))
});

task('less', function () {
  return src('./src/less/style.less')
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions'],
      cascade: false
    }))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
});

task('minjs', function () {
  return src(src_js)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
});

task('html', function () {
  return src(src_html)
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
});

task('watch', function () {
  watch(src_less, parallel('less')),
  watch(src_html, parallel('html')),
  watch(src_js, parallel('minjs')),
  watch(src_img, parallel('imagemin'));
});

task('default', parallel('html', 'less', 'minjs', 'imagemin', 'browserSync', 'watch'));