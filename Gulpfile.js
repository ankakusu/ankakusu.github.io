// TODO: remove dependency to gulp
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var sassyImport = require('postcss-sassy-import');

var config = {
    cssSrcFiles: [
        'css/style.css'
    ],
    cssWatchFiles: [
        'css/**/*.css'
    ],
    cssDstFile: '_site/css/',
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

gulp.task('css:watch', function () {
    gulp.watch(config.cssWatchFiles, ['css']);
});

gulp.task('default', ['css']);

gulp.task('watch', ['css:watch']);
