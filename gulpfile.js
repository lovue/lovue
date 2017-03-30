const gulp = require('gulp')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const cached = require('gulp-cached')
const changed = require('gulp-changed')
const clean = require('gulp-dest-clean')
const replace = require('gulp-replace')

gulp.task('less', () => {
  gulp.src('src/less/@(global|style).less')
    .pipe(less({
      strictMath: "on"
    }))
    .pipe(cached('less'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'))
})

gulp.task('watch', () => {
  gulp.watch('src/less/**/*', ['less'])
})

gulp.task('default', () => gulp.start('watch'))



gulp.task('build', ['less'], () => {
  gulp.src('index.html')
    .pipe(clean('../release', {
      force: true
    }))
    .pipe(replace(/js\/vendor\/(echarts|vue)\.js/g, 'js/vendor/$1.min.js'))
    .pipe(changed('../release', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('../release'))

  gulp.src('public/**/*')
    .pipe(clean('../release/public', {
      force: true
    }))
    .pipe(changed('../release/public', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('../release/public'))

  // gulp.src(['page/**/*','!page/test.html','!page/components-doc.html'])
  //   .pipe(clean('../bss_fe_release/page', {
  //     force: true
  //   }))
  //   .pipe(replace(/js\/vendor\/(echarts|vue)\.js/g, 'js/vendor/$1.min.js'))
  //   .pipe(changed('../bss_fe_release/page', {
  //     hasChanged: changed.compareSha1Digest
  //   }))
  //   .pipe(gulp.dest('../bss_fe_release/page'))
})
