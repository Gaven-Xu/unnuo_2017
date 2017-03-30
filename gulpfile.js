var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    cleanCss = require('gulp-clean-css'),
    imgmin = require('gulp-image'),
    spriter = require('gulp-css-spriter');
// sassLint = require('gulp-sass-lint'); 文档不好用

gulp.task('default', function() {
    gulp.start('css');
    gulp.start('es');
})

gulp.task('clean', function() {
    gulp.start('clean-css');
    gulp.start('clean-js');
})

/**
 * css pre compiler
 * Sass Scss
 * {todo} Less Stylus Compass
 * @return no
 */
gulp = (function(gulp) {

    gulp.task('scss', function() {
        gulp.src('./src/style/*.scss')
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
                gulp.start('sprite');
            });
    })

    gulp.task('sass', function() {
        gulp.src('./src/style/*.sass')
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
                gulp.start('sprite');
            });
    })

    gulp.task('sprite',function() {
        gulp.src('./style/style.css')
        .pipe(spriter({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': './img/spritesheet.png',
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
        }))
        // 开始记录map
        .pipe(sourcemap.init())
        .pipe(rename(function(path) {
            path.basename += '.spr'
        }))
        // 增加css压缩
        .pipe(cleanCss())
        .pipe(sourcemap.write('./'))
        .pipe(gulp.dest('./style/'));
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

    gulp.task('css', ['clean-css'], function() {
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
        gulp.src('./script', {
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
