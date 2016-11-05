var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('gulp-exec');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var sassyImport = require('postcss-sassy-import');

var config = {
    cssSrcFiles: [
        // './dev/css/reset.css',
        // './dev/css/normalize.css',
        // './dev/css/generics.css',
        // './dev/css/elements.css',
        // './dev/css/components/**/*.css',
        // './dev/css/objects/**/*.css'
        './dev/css/style.css'
    ],
    cssWatchFiles: [
        './dev/css/**/*.css'
        // './dev/css/*.css'
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
        cssnext({browsers: ['last 1 version']})
    ];

    return gulp.src(config.cssSrcFiles)
        .pipe(postcss(processors))
        // .pipe(concat('style.css'))
        .pipe(gulp.dest(config.cssDstFile));
});

gulp.task('css:watch', function () {
    gulp.watch(config.cssWatchFiles, ['css']);
});

gulp.task('default', ['css']);

gulp.task('watch', ['css:watch']);
