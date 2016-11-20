var fileSystem = require('fs');
var pug = require('pug');
var glob = require('glob');
var marked = require('marked');

var readPostSummary = function(fileName) {
    var fileContent = fileSystem.readFileSync(fileName, 'utf8');
    var multiLineSummary = fileContent
        .replace(/^---\r?\n[\s\S]*---\r?\n([\s\S]*)\r?\n<!--MORE-->[\s\S]*/gm, '$1')
        .trim();
    return marked(multiLineSummary.replace(/(?:\r\n|\r|\n)/g, ' '));
};

var readPost = function(fileName) {
    return {
        'summary': readPostSummary(fileName)
    };
};

function generateBlogIndex(fileGlob, blogTempate) {
    var fileNames = glob.sync(fileGlob);
    var posts = fileNames.map(readPost);
    var blogPage = pug.renderFile(blogTempate, {
        posts: posts
    });
    fileSystem.writeFileSync('_site/blog/index.html', blogPage);
}

module.exports = generateBlogIndex;
