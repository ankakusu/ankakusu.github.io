var fileSystem = require('fs');
var pug = require('pug');
var glob = require('glob');
var marked = require('marked');

function readPostSummary(fileName) {
    var fileContent = fileSystem.readFileSync(fileName, 'utf8');
    var multiLineSummary = fileContent
        .replace(this.blog.regex, '$1')
        .trim();
    return marked(multiLineSummary.replace(this.removeNewLineRegex, ' '));
}

function readPost(fileName) {
    return {
        'summary': readPostSummary.call(this, fileName)
    };
}

function generateBlogIndex() {
    var that = this;
    var fileNames = glob.sync(this.blog.postSrc);
    var posts = fileNames.map(function(file) {
        return readPost.call(that, file);
    });
    var blogPage = pug.renderFile(this.blog.indexTemplate, {
        posts: posts
    });
    fileSystem.writeFileSync(this.blog.indexOutput, blogPage);
}

module.exports = generateBlogIndex;
