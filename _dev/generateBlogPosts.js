

function generateBlogPosts() {
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

module.exports = generateBlogPosts;
