var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('gulp-exec');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var sassyImport = require('postcss-sassy-import');
var pug = require('gulp-pug');

var config = {
    cssSrcFiles: [
        './dev/css/style.css'
    ],
    cssWatchFiles: [
        './dev/css/**/*.css'
    ],
    viewSrcFiles: [
        './dev/view/pages/*.pug'
    ],
    viewWatchFiles: [
        './dev/view/**/*.pug'
    ],
    cssDstFile: 'output'
};

gulp.task('css', function () {
    var processors = [
        sassyImport(),
        cssnext({
            browsers: ['last 1 version']
        })
    ];

    return gulp.src(config.cssSrcFiles)
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.cssDstFile));
});

gulp.task('view', function buildHTML() {
    return gulp.src(config.viewSrcFiles)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.cssDstFile));
});

gulp.task('css:watch', function () {
    gulp.watch(config.cssWatchFiles, ['css']);
});

gulp.task('view:watch', function() {
    gulp.watch(config.viewWatchFiles, ['view']);
});

gulp.task('default', ['css', 'view']);

gulp.task('watch', ['css:watch', 'view:watch']);
