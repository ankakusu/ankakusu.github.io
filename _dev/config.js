
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
        srcFiles: '**/*.pug',
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
        blogRootFolder: '_site/blog',
        outputRootFolder: '_site/',
        regex: /^---\r?\n([\s\S]*)---\r?\n([\s\S]*)\r?\n<!--MORE-->([\s\S]*)/gm
    },
    tango: {
        tangoRootFolder: '_site/tango'
    },
    headerMenuItems: {
        home: {
            url: '/',
            name: '/home'
        },
        blog: {
            url: '/blog',
            name: '/blog'
        }
        // TODO: add tango page later on.
        // tango: {
        //     url: '/tango',
        //     name: '/tango'
        // }
    },
    socialMenuItems: {
        twitter: {
            iconSrc: 'twitter.svg',
            url: 'https://twitter.com/yaprakaya'
        },
        github: {
            iconSrc: 'github.svg',
            url: 'https://github.com/ankakusu'
        },
        mail: {
            iconSrc: 'mail.svg',
            url: 'mailto:yaprak.ayazoglu@gmail.com'
        },
        linkedin: {
            iconSrc:'in.svg',
            url: 'https://www.linkedin.com/in/yaprakayazoglu'
        }
    }
};

module.exports = config;
