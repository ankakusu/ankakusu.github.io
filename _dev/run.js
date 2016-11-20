var generateBlogIndex = require('./generateBlogIndex');

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

// Generate the blog index page of the blog.
generateBlogIndex(config.blogSrc, config.blogTemplate);

// Generate the blog pages
