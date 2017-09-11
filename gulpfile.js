const gulp = require('gulp')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const cached = require('gulp-cached')
const clean = require('gulp-dest-clean')
const changed = require('gulp-changed')

gulp.task('less', () => {
  gulp.src('src/less/lovue.less')
    .pipe(less({
      strictMath: 'on'
    }))
    .pipe(cached('less'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('src/less/**/*', ['less'])
})

gulp.task('default', () => gulp.start('watch'))

gulp.task('build', () => {
  gulp.src([
    '@(dist)/*',
    'LICENSE',
    'package.json',
    'README.md'
  ])
    .pipe(clean('../lovue-release/', [], {force: true}))
    .pipe(changed('../lovue-release', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('../lovue-release'))
})
