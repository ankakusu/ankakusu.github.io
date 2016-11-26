var fileSystem = require('fs');
var pug = require('pug');
var glob = require('glob');
var marked = require('marked');
var moment = require('moment');
var mkdirp = require('mkdirp');

function metadataToJSON(metadata) {
    var metadataJSON= {},
        lines = metadata
        .trim()
        .split('\n');

    lines.forEach(function(line) {
        var arr = line.trim().split(':');
        metadataJSON[arr.shift()] = arr.join('').trim();
    });
    return metadataJSON;
}

function readPostContent(fileContent, matchedGroupIndex) {
    var multiLineSummary = fileContent
        .replace(this.blog.regex, matchedGroupIndex)
        .trim();
    return marked(multiLineSummary.replace(this.removeNewLineRegex, ' '));
}

function getMetadata(fileContent, matchedGroupIndex) {
    var blogAttributes = fileContent
        .replace(this.blog.regex, matchedGroupIndex)
        .trim();
    return metadataToJSON(blogAttributes);
}

function readPostAttributes(fileName) {
    var fileContent = fileSystem.readFileSync(fileName, 'utf8');

    return {
        'summary': readPostContent.call(this, fileContent, '$2'),
        'metadata': getMetadata.call(this, fileContent, '$1'),
        'content': readPostContent.call(this, fileContent, '$3')
    };
}

function getFileNames() {
    if (!files) {
        var files = glob.sync(this.blog.postSrc);
    }

    return files;
}

function generatePostIndexPage() {
    var that = this;
    var fileNames = getFileNames.call(this);

    var posts = fileNames
        .map(function(file) {
            return readPostAttributes.call(that, file);
        })
        .reverse();

    var blogPage = pug.renderFile(this.blog.indexTemplate, {
        posts: posts
    });

    fileSystem.writeFileSync(this.blog.indexOutput, blogPage);
}

function getBlogPostFolderPath(metadata) {
    var dateInString = metadata.created_at.split(' ')[0];
    var createdAt = moment(dateInString, 'YYYY-MM-DD');

    return this.blog.outputRootFolder +
        createdAt.year() + '/' +
        (createdAt.month() + 1) + '/' +
        createdAt.date() + '/';
}

function getBlogPostPath(metadata) {
    return getBlogPostFolderPath.call(this, metadata) + metadata.title.split(' ').join('-') + '.html';
}

function generatePosts() {
    var that = this;
    var fileNames = getFileNames.call(this);

    // get posts
    var posts = fileNames.map(function(file) {
        return readPostAttributes.call(that, file);
    });

    posts.forEach(function(post) {
        var blogPostContent = [post.summary, post.content].join('\n');

        var folderPath = getBlogPostFolderPath.call(that, post.metadata);
        mkdirp.sync(folderPath);

        var compiledBlogFile = pug.renderFile(that.blog.blogPageTemplate, {
           blog: marked(blogPostContent)
        });

        fileSystem.writeFileSync(getBlogPostPath.call(that, post.metadata), compiledBlogFile);
    });
}

module.exports = {
    postIndexPage: generatePostIndexPage,
    posts: generatePosts
};
