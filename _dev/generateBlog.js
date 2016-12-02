var fileSystem = require('fs');
var pug = require('pug');
var hljs = require('highlight.js');
var moment = require('moment');
var mkdirp = require('mkdirp');
var fileOperations = require('./utils/fileOperations');
var JSONObjectUtils = require('./utils/cloneJSONObject');
var markedIt = require('markdown-it')({
    html: true,
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

function generatePostIndexPage() {
    var that = this;
    var fileNames = fileOperations.get(this.blog.postSrc);
    var headerMenuItems = JSONObjectUtils.clone(this.headerMenuItems);
    headerMenuItems['blog']['classed'] = 'active';

    var posts = fileNames
        .map(function(file) {
            return readPostAttributes.call(that, file);
        })
        .reverse();

    var blogPage = pug.renderFile(this.blog.indexTemplate, {
        posts: posts,
        headerMenuItems: headerMenuItems,
        moment: moment
    });

    fileSystem.writeFileSync(this.blog.indexOutput, blogPage);
}

function generatePosts() {
    var that = this;
    var fileNames = fileOperations.get(this.blog.postSrc);

    // get posts
    var posts = fileNames.map(function(file) {
        return readPostAttributes.call(that, file);
    });

    posts.forEach(function(post) {
        mkdirp.sync(post.folder);

        var compiledBlogFile = pug.renderFile(that.blog.blogPageTemplate, {
            blog: markedIt.render(post.blogPostContent),
            post: post,
            headerMenuItems: that.headerMenuItems,
            moment: moment
        });

        var filePath = post.folder + post.fileName.replace('.md', '.html');
        fileSystem.writeFileSync(filePath, compiledBlogFile);
    });
}

function readPostAttributes(fileName) {
    var fileContent = fileSystem.readFileSync(fileName, 'utf8');

    var metadata = getMetadata.call(this, fileContent, '$1');
    var fileNameWithoutDate = fileName.split('-')[1];
    var folderPath = getBlogPostFolderPath.call(this, metadata);

    var summary = readPostContent.call(this, fileContent, '$2');
    var content = readPostContent.call(this, fileContent, '$3');

    return {
        'summary': markedIt.render(summary),
        'metadata': metadata,
        'content': content,
        'fileName': fileNameWithoutDate,
        'folder': this.blog.outputRootFolder + folderPath,
        'url': '/' + folderPath + fileNameWithoutDate.replace('.md', '.html'),
        'blogPostContent': [summary, content].join('\n')
    };
}

function readPostContent(fileContent, matchedGroupIndex) {
    return fileContent
        .replace(this.blog.regex, matchedGroupIndex)
        .trim();
}

function getBlogPostFolderPath(metadata) {
    var dateInString = metadata.created_at.split(' ')[0];
    var createdAt = moment(dateInString, 'YYYY-MM-DD');

    return  'blog/' +
        createdAt.year() + '/' +
        (createdAt.month() + 1) + '/' +
        createdAt.date() + '/';
}

function getMetadata(fileContent, matchedGroupIndex) {
    var blogAttributes = fileContent
        .replace(this.blog.regex, matchedGroupIndex)
        .trim();
    return metadataToJSON(blogAttributes);
}

function metadataToJSON(metadata) {
    var metadataJSON= {},
        lines = metadata
            .trim()
            .split('\n');

    lines.forEach(function(line) {
        var arr = line.trim().split(': ');
        metadataJSON[arr.shift()] = arr.join('').trim();
    });
    return metadataJSON;
}

module.exports = {
    postIndexPage: generatePostIndexPage,
    posts: generatePosts
};
