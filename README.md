# yaprakayazoglu.com

This is my personal website which is build by a static site generator 
developed by me using JavaScript based technologies.

Note that, for the time being, this generator is strongly coupled with 
my own implementation, and is not a fully reusable content generator site, yet. 

## The Stack
- [PugJS](https://pugjs.org/api/getting-started.html) as the templating engine.
- [MarkdownIt](https://github.com/markdown-it/markdown-it) as a Markdown parser.
- HighlightJS as offline syntax highlighting.
- Only [CSS Next](http://cssnext.io/features/) and [sassy import](https://www.npmjs.com/package/postcss-sassy-import) 
plugins of post css for building the CSS. 

## Notes on the folder structure

All the files inside the folders that start with `_` may be code
generation scripts(`_dev`), partial files or view templates for the
site(`_blog`, `_includes`, `_layout`, `_mixins`), the blog content(`_posts`).

All the folders without `_` will be compiled and placed with the same name
under the root folder.

For instance, the folder `css` does not start with an underscore and thus, 
when the files are compiled, the content will be placed `<output-folder-name>/css/`.

Now, I would like to elaborate more on the files and their purposes. 

```
# -------------------------
# Tree View of the project
# -------------------------

├── Gulpfile.js
├── _blog # Templates for blogs and blog index pages
│   ├── blogPage.pug
│   └── index.pug
├── _dev # The functions that generates views, blog pages and blog index page.
│   ├── config.js
│   ├── generateBlog.js
│   ├── generateViews.js
│   ├── run.js
│   └── utils
│       ├── cloneJSONObject.js
│       └── fileOperations.js
├── _img
│   ├── # all images
├── _includes # All static templates
│   ├── footer.pug
│   └── head.pug
├── _layout # The generic layout that every page extends from
│   └── default.pug
├── _mixins 
│   ├── header.pug
│   ├── image.pug
│   ├── nav.pug
│   └── postSummary.pug
├── _posts
│   ├── # all posts
├── _site
│   ├── # all generated files
├── css
│   ├── # all css files 
├── deploy.sh
├── index.pug
├── package.json
├── run.sh
└── tango
    └── index.pug
```

### The Pug templates:

The pug templates are living in the following folder and files:

- index.pug:
The home page of the website, which extends from `_layout/default.pug`.
- _layout/
The default template of the webpage.
- _mixins/
Reusable code parts, like blog post 
- _includes/
Static parts of the website like the head and the footer.
- _blog/
Templates that are related to the blog posts.

### Static content generation scripts: `_dev` folder 

This is the heart of the static site generation part. Let's discuss all the files sequentially.

<strong>_dev/config.js</strong>

This file includes all the configuration files, like the source, destination and watch files and folders.

This file also includes the routes for the navigations menus. For instance, the social and header navigation menu 
links also defined within this file.

<strong>_dev/generateBlog.js</strong>

The blog part has mainly two types of pages, 

1. The blog index page, which is the page that you can only see the summaries of the blog posts
(_e.g._ http://yaprakayazoglu.com/blog/).
The `generatePostIndexPage()` function fetches all the blog posts, extracts the summary content and meta data 
and passes those values to the `_blog/index.pug` template.

1. The blog page, which displays all content related to a specific content page.
The `generatePosts()` function iterates through all the fetched blog posts, renders them with the 
blogPage.pug template, parses the markdown content, highlights the codes(if there's a code snippet),
creates the output folder and writes the blog posts in HTML format.

<strong>_dev/run.js</strong>

Run.js is just runs all the content generator scripts to have compile all your website.

<strong>_site</strong>

This is the output folder, where all the generated content will be placed under this folder.

## How does it work?

### While developing...

While building or changing the design of my website, I simply run `gulp watch` to render css files.
This part will be replaced with a JavaScript codes and the dependency to Gulp task manager will be
reduced. Whenever, there's a change in your css folder, the it will compiled into the path that is
defined in `config.css.destFolder`. In my implementation, that is `_site/css/styles.css`.

When something is updated in the pug templates, I run the `./run.sh` command to re-compile the website.
The contents of the run shell script is follows:

```bash
node ./_dev/run.js # generate the content of the whole website.
gulp # Generate css files.
```

If I want to see the output of my changes locally, I run `python -m SimpleHTTPServer` under the folder `_site/`.

Another note is that, you may very rightfully ask the question, why I use Gulp for compiling/optimizing css and NodeJS 
for the rest. Please, keep a mental bookmark for this question. Because, I'll be telling the reason
at the last section of this post.

### How to deploy?

In my repo, I have 2 different branches, the source and the master branch and whatever that is placed in master branch
will be observed in my domain(http://yaprakayazoglu.com). 

To deploy my website, I need to place all the generated content under `_site/` to the master branch. The procedure is
for that is as follows:

0) In the master and source branch put the `_site` folder to the .gitignore file.

1. Commit your latest changes under the source branch.
1. Checkout to master branch
1. Sync all the files under the `_site` folder to the root folder of the project.
1. Commit this changes.
1. Push the changes to the master branch in github!
1. Checkout back to source branch to continue developing

The website is ready!

As you can observe, this process is really likely to be optimized with the following deploy script:

```bash
# Copied from https://github.com/vy/vy.github.io/blob/source/publish.sh

isEverythingComitted() {
	outputLineCount=$(git status -s | wc -l) #| grep -q "nothing to commit, working directory clean"
	[ $outputLineCount -eq 0 ]
}

getLastCommitId() {
	git log -1 | head -n 1 | awk '{print $2}'
}

echo "*** Checking repository state... "
isEverythingComitted || {
	echo "error: there are still changes to be committed." >&2
	exit 1
}
lastCommitId=$(getLastCommitId)

echo "*** Compiling..."

rsync -a --delete --force _img/ _site/img
node ./_dev/run.js
# TODO: remove dependency to gulp
gulp deploy

echo "*** Switching to master..."
git checkout master

echo "*** Syncing output files..."
rsync --exclude-from rsync-excludes.txt -a --delete --force _site/ .

echo "*** Adding all output files to the repository..."
git add .

echo "*** Committing changes..."
git commit -a -m "Copied changes from source/$lastCommitId."

echo "*** Pushing changes..."
git push -f origin master source

echo "*** Switching back to source..."
git checkout source

```

## Final Remarks

When I first started this project, I used Gulp as an automation tool and I fastly build
the structure to render my pug templates, add markdown support. However, I was stuck
when I wanted to build the blog index page(http://yaprakayazoglu.com/blog/). Because,
this requires to iterate through all the blog posts, grab all the summary blocks
and create a single page from those content. I've stuck in this part and started to
write my own tasks in JavaScript, in which I'll have full control over the content.

Now, there are Bash scripts, JavaScipts and Gulp tasks as automation. I'll try to reduce
the dependency to Gulp, in the future and I have more improvements. You can check them in
the following list.

## TODO List

- [ ] Add _drafts folder to manage the draft files.
- [ ] Remove dependency to GulpJS.
- [ ] Watching files and react on delta changes rather than blindly building all from scratch.
- [ ] Create an npm module for the static content generation part.
- [ ] The `_dev/config.js` file includes configuration variables related to static content generator
and also implementation specific variables. This needs to be separated.

