var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cached = require('gulp-cached'),
    sourcemap = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    imgmin = require('gulp-image'),
    spriter = require('gulp-css-spriter')
    plumber = require('gulp-plumber');
// sassLint = require('gulp-sass-lint'); 文档不好用

gulp.task('default', function() {
    gulp.start('css');
    gulp.start('es');
})

gulp.task('clean:all', function() {
    del([
        './script/',
        './style'
    ])
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
            // .pipe(cached('scssfiles'))
            .pipe(plumber())
            .pipe(sourcemap.init({
                loadMaps: true
            }))
            .pipe(sass({
                outputStyle: 'compressed'
            })) //.on('error', sass.logError)
            .pipe(rename(function(path) {
                path.basename += '.min'
            }))
            .pipe(sourcemap.write('./'))
            // write() 将map信息，以注释的方式插入到编译文件中
            // write('./') 将map信息，在指定目录，以map文件的方式存储
            .pipe(gulp.dest('./style/'))
            .on('end', function() {
                // gulp.start('sprite');
            });
    })

    gulp.task('sprite', function() {
        gulp.src('./style/style.min.css')
            // 开始记录map
            .pipe(plumber())
            .pipe(sourcemap.init())
            .pipe(spriter({
                // The path and file name of where we will save the sprite sheet
                'spriteSheet': './img/spritesheet.png',
                // Because we don't know where you will end up saving the CSS file at this point in the pipe,
                // we need a litle help identifying where it will be.
                'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
            }))
            .pipe(rename(function(path) {
                path.basename += '.spr'
            }))
            // 增加css压缩
            .pipe(sourcemap.write('./'))
            .pipe(gulp.dest('./style/'));
    })

    gulp.task('clean:css', function() {
        del([
            './style'
        ])
    })

    gulp.task('css:watch', ['clean:css'], function() {
        gulp.start('scss');
        gulp.watch(['./src/style/**/*.scss'], ['scss']);
    })

    gulp.task('css', function() {
        gulp.start('scss');
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
            .pipe(cached('jsfiles'))
            .pipe(plumber())
            .pipe(sourcemap.init())
            .pipe(babel().on('error', function(err) {
                console.log(err);
            }))
            .pipe(rename(function(path) {
                path.basename += '.min'
            }))
            .pipe(uglify())
            .pipe(sourcemap.write('./'))
            .pipe(gulp.dest('./script/'));
    })

    gulp.task('clean:js', function() {
        del([
            './script'
        ])
    })

    gulp.task('js:watch', ['clean:js'], function() {
        gulp.start('js');
        gulp.watch(['./src/script/**/*.js'], ['es'])
    })

    gulp.task('js', function() {
        gulp.start('es');
    })

    return gulp;

})(gulp)
/**
 * For release
 * move script and style out of dist
 * del folder dist、src、node_modules、.babelrc、
 */
