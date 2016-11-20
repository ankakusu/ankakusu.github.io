var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('gulp-exec');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var sassyImport = require('postcss-sassy-import');
var gulpPug = require('gulp-pug');
var pug = require('pug');
var path = require('path');
var debug = require('gulp-debug');
var glob = require('glob');
var fileSystem = require('fs');
var ejs = require('ejs');
var marked = require('marked');
var rename = require('gulp-rename');

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

var readPostSummary = function(fileName) {
    var fileContent = fileSystem.readFileSync(fileName, 'utf8');
    // fileContent = fileName;
    var multiLineSummary = fileContent
        .replace(/^---\r?\n[\s\S]*---\r?\n([\s\S]*)\r?\n<!--MORE-->[\s\S]*/gm, '$1')
        .trim();
    return multiLineSummary.replace(/(?:\r\n|\r|\n)/g, ' ');
};

var readPost = function(fileName) {
    return {
        'summary': readPostSummary(fileName)
    };
};

// Create a gulp task to create the blog/index.gulpPug based on the blog posts
// available _posts folder
var through = require('through2');
var blogIndexGenerator = function(fileSelector) {
    return through.obj(function(file, encoding, done) {
        var fileNames = glob.sync(fileSelector);
        var posts = fileNames.map(readPost);

        // if (file.isBuffer()) {
        //     console.log('is buffer');
        // } else if (file.isStream()) {
        //     console.log('is stream');
        // }

        // var post = readPost(file.toString('utf8'));

        var blogPage = pug.renderFile(config.blogTemplate, {posts: posts});
        // console.log(blogPage);
        // console.log(post);
        // console.log(file);
        // file.contents = new Buffer(blogPage);
        // this.push(new Buffer(blogPage));
        // this.push(blogPage);
        // var indexPugEjs = fileSystem.readFileSync('blog/index.gulpPug.ejs', 'utf8');
        // var indexPug = ejs.render(indexPugEjs, {'posts': posts});
        fileSystem.writeFileSync('_site/blog/index.html', blogPage);
        done();
    });
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

console.log(config.viewDstFile + '/blog/');
gulp.task('blog', function () {
    return gulp.src(config.blogFolder)
        .pipe(blogIndexGenerator(config.blogSrc));
});

gulp.task('css:watch', function () {
    gulp.watch(config.cssWatchFiles, ['css']);
});

gulp.task('view:watch', function() {
    gulp.watch(config.viewWatchFiles, ['view']);
});

gulp.task('default', ['css', 'view']);

gulp.task('watch', ['css:watch', 'view:watch']);
