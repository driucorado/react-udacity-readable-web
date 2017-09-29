var gulp = require('gulp');
var less = require('gulp-less'); 
 
 
/* Task to compile less */
gulp.task('compile-main-less', function() {  
  gulp.src('./src/**/style/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/style/css/'));
}); 
gulp.task('compile-component-less', function() {  
  gulp.src('./src/**/style/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/style/css/'));
}); 
/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./src/**/style/*.less' , ['compile-component-less']);
  gulp.watch('./src/style/*.less' , ['compile-main-less']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less']);