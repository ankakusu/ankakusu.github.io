var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('gulp-exec');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var sassyImport = require('postcss-sassy-import');
var gulpPug = require('gulp-pug');
var pug = require('pug');
var debug = require('gulp-debug');

var config = {
    cssSrcFiles: [
        'css/style.css'
    ],
    cssWatchFiles: [
        'css/**/*.css'
    ],
    cssDstFile: '_site/css/',
    viewSrcFiles: [
        '!node_modules/**',
        '!_**/*.pug',
        '!blog/*.pug',
        'index.pug',
        '**/*.pug'
    ],
    viewWatchFiles: [
        '**/*.pug'
    ],
    viewDstFile: '_site',
    blogFolder: '_posts',
    blogSrc: '_posts/**/*.md',
    blogTemplate: 'blog/index.pug'
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
        .pipe(debug({title: 'view:'}))
        .pipe(gulpPug({
            pretty: true
        }))
        .pipe(gulp.dest(config.viewDstFile));
});

gulp.task('css:watch', function () {
    gulp.watch(config.cssWatchFiles, ['css']);
});

gulp.task('view:watch', function() {
    gulp.watch(config.viewWatchFiles, ['view']);
});

gulp.task('default', ['css', 'view']);

gulp.task('watch', ['css:watch', 'view:watch']);
