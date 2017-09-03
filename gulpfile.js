const gulp = require('gulp')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const cached = require('gulp-cached')

gulp.task('less', () => {
  gulp.src('src/less/@(global|style|admin).less')
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
  gulp.src('public/css/global.css')
    .pipe(gulp.dest('dist'))
})
