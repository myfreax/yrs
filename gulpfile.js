/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const fs = require('fs');
const path = require('path');

const babelRc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf8'));
const SRC = 'src/**/*.js';
const DST = 'dist/**/*.js';

gulp.task('build', ()=> {
    gulp.src(SRC)
        .pipe(plumber({
            errorHandler(err){
                gutil.log(err.stack);
            }
        }))
        .pipe(newer(DST))
        .pipe(babel(babelRc))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);

gulp.task('watch', ['build'], ()=> {
    gulp.watch(SRC, ()=> {
        gulp.start('build');
    });
});
