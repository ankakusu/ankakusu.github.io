
var config = {
    removeNewLineRegex: /(?:\r\n|\r|\n)/g,
    css: {
        srcFiles: [
            'css/style.css'
        ],
        dstFolder: '_site/css/',
        watchFiles: [
            '_site/css/'
        ]
    },
    view: {
        srcFiles: [
            '!node_modules/**',
            '!_**/*.pug',
            'index.pug',
            '**/*.pug'
        ],
        watchFiles: [
            '**/*.pug'
        ],
        dstFiles: '_site',

    },
    blog: {
        inputFolder: '_posts',
        postSrc: '_posts/**/*.md',
        indexTemplate: '_blog/index.pug',
        blogPageTemplate: '_blog/blogPage.pug',
        indexOutput: '_site/blog/index.html',
        outputRootFolder: '_site/blog/',
        regex: /^---\r?\n([\s\S]*)---\r?\n([\s\S]*)\r?\n<!--MORE-->([\s\S]*)/gm
    }
};

module.exports = config;
