var config = require('./config');

var generateBlog = require('./generateBlog');

// Generate the blog index page of the blog.
generateBlog.postIndexPage.call(config);

// Generate the blog pages
generateBlog.posts.call(config);
