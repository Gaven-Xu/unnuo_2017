var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');
// sassLint = require('gulp-sass-lint'); 文档不好用

gulp.task('default', function() {
    gulp.start('css');
    gulp.start('es');
})

/**
 * css pre compiler
 * Sass Scss
 * {todo} Less Stylus Compass
 * @return no
 */
gulp = (function(gulp) {

    gulp.task('scss', function() {
        gulp.src('./src/style/**/*.scss')
            .pipe(sourcemap.init({
                loadMaps: true
            }))
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(sourcemap.write('./'))
            // write() 将map信息，以注释的方式插入到编译文件中
            // write('./') 将map信息，在指定目录，以map文件的方式存储
            .pipe(gulp.dest('./style/'))
            .on('end', function() {
                // gulp.start('concat-css');
            });
    })

    gulp.task('sass', function() {
        gulp.src('./src/style/**/*.sass')
            .pipe(sourcemap.init({
                loadMaps: true
            }))
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(sourcemap.write('./'))
            // write() 将map信息，以注释的方式插入到编译文件中
            // write('./') 将map信息，在指定目录，以map文件的方式存储
            .pipe(gulp.dest('./style/'))
            .on('end', function() {
                // gulp.start('concat-src');
            });
    })

    gulp.task('clean-css', function() {
        gulp.src(['./style/'], {
                read: false
            })
            .pipe(clean({
                force: true
            }))
    })

    gulp.task('css:watch', ['clean-css'], function() {
        gulp.watch(['./src/style/**/*.scss'], ['scss']);
        gulp.watch(['./src/style/**/*.sass'], ['sass']);
    })

    gulp.task('css',['clean-css'],function() {
        gulp.start('scss');
        gulp.start('sass');
    })

    return gulp;

})(gulp)

/**
 * ES pre compiler
 * using babel
 */
gulp = (function(gulp) {

    gulp.task('es', function() {
        gulp.src('./src/script/**/*.js')
            .pipe(concat('script.js'))
            .pipe(sourcemap.init())
            .pipe(babel())
            // .pipe(sourcemap.write('./'))
            .pipe(gulp.dest('./script'))
            // .pipe(sourcemap.init())
            .pipe(rename(function(path) {
                path.basename += '.min'
            }))
            .pipe(uglify())
            .pipe(sourcemap.write('./'))
            .pipe(gulp.dest('./script/'));
    })

    gulp.task('clean-js', function() {
        gulp.src(['./script/**/*.js', './script/**/*.map'], {
                read: false
            })
            .pipe(clean({
                force: true
            }))
    })

    gulp.task('es:watch', ['clean-js'], function() {
        gulp.watch(['./src/script/**/*.js'], ['es'])
    })

    return gulp;

})(gulp)

/**
 * For release
 * move script and style out of dist
 * del folder dist、src、node_modules、.babelrc、
 */
