var gulp = require('gulp')
var less = require('gulp-less')

gulp.task('less', () => {
  gulp.src('src/less/@(global|style).less')
    .pipe(less({
      strictMath: "on"
    }))
    .pipe(gulp.dest('public/css'))
})

gulp.task('watch', () => {
  gulp.watch('src/less/**/*', ['less'])
})

gulp.task('default', () => gulp.start('watch'))
