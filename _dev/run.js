var config = require('./config');

var generateBlogIndex = require('./generateBlogIndex');
var generateBlogPosts = require('./generateBlogPosts');

// Generate the blog index page of the blog.
generateBlogIndex.call(config);

// Generate the blog pages
// generateBlogPosts();
