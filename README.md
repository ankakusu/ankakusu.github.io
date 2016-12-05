# yaprakayazoglu.com

This is my personal website which is build by a static site generator 
developed by me using JavaScript based technologies.

Note that, for the time being, this generator is coupled with my own website 
implementation, and is not a fully reusable content generator, yet. 

## The Stack

- [PugJS](https://pugjs.org/api/getting-started.html) as the templating engine.
- [MarkdownIt](https://github.com/markdown-it/markdown-it) as a Markdown parser.
- HighlightJS as offline syntax highlighting.
- Only [CSS Next](http://cssnext.io/features/) and [sassy import](https://www.npmjs.com/package/postcss-sassy-import) 
plugins of post css for building the CSS. 

## Notes on the folder structure

There are two types of folders: Start 1) with underscore(`_`),
and 2) without underscore.

All the underscore(`_`) folders include code generation scripts(`_dev`), 
partial views, view templates for the site
(`_blog`, `_includes`, `_layout`, `_mixins`) and the blog content(`_posts`or `_drafts`).

Folder without underscore will be compiled and 
placed with the same name under the root folder. For instance, the folder 
`css` does not start with an underscore and thus, when the files are 
compiled, the content will be placed `<output-folder-name>/css/`.


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

Now, let's continue with the implementation details...

### Static content generation scripts: `_dev` folder 

The heart of the static site generation is grouped in `_dev` folder. As you can see in the tree view above,
this folder has 4 important scripts: config.js, generateBlog.js, generateViews.js and run.js.

<strong>_dev/config.js</strong>

config.js, contains all the configuration files, as in source, destination and watch files and folders.

In addition, it has the routes for the navigation menus: The social and header navigation menu routes. 
Note that, It is in the todo list to refactor website implementation specific configurations out to another file.

<strong>_dev/generateBlog.js</strong>

Generate blog generates the blog index page and the blog pages.

1. The blog index page aggregates the blog summaries. (_e.g._ http://yaprakayazoglu.com/blog/).
The `generatePostIndexPage()` function fetches all the blog posts, extracts the summary content and meta data 
and passes those values to the `_blog/index.pug` template.

1. The blog page
The `generatePosts()` function iterates through all the blog posts(`_posts/*`), renders with 
blogPage.pug template, parses the markdown content, highlights the code blocks(if necessary), creates the 
output folder(if necessary) and finally, writes the blog posts as a proper HTML file, under this folder.

<strong>_dev/generateViews.js</strong>

Views are simply all the pages but the blog index and blog pages.(_e.g._ homepage and all the 
folders that does not have an underscore before it.)

<strong>_dev/run.js</strong>

Run.js basically runs every script described above.

<strong>_site</strong>

This is the output folder. The generated contents are placed here.

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
- Folders which do not start with underscore
Each of those folders will be compiled as a new page when deployed. Note that, the route configuration should
be provided to the config file.
For instance, if I create a folder `tango` in which I want to write some information about Argentine Tango,
in the output folder, all the content that is compiled will be placed in this folder.

## How does it work?

### While developing...

- `gulp watch`

Currently, all the css files are watched.

Whenever, there's a change in your css folder, the it will compiled into the path that is
defined in `config.css.destFolder`. In my implementation, that is `_site/css/styles.css`.

The dependency to Gulp task manager will be reduced, soon. The watcher will be a task written either in JavaScript or
Bash. 

- `./run.sh` 

When something is updated in the pug templates, I run the `./run.sh` command to re-compile the website.
The contents of the run shell script is follows:

```bash
node ./_dev/run.js # generate the content of the whole website.
gulp # Generate css files.
```

- Running the website locally 

The compiled content are put under the `_site` folder.
The following command sequence will be enough to observe your changes locally.

```bash
cd _site
python -m SimpleHTTPServer
```

Another note is that, you may very rightfully ask the question, why I use Gulp for compiling/optimizing css and NodeJS 
for the rest. Please, keep a mental bookmark for this question. Because, I'll be telling the reason
at the last section of this post.

### How to deploy?

In the repo, there are 2 different branches: 1)the source and 2)the master. According to Github Pages, 
whatever that is placed in master branch will be observed in the domain(http://yaprakayazoglu.com). 

To deploy, all the content inside `_site` folder should be placed to the root of the master branch. The 
procedure to follow is as follows:

0) In the master and source branch put the `_site` folder to the .gitignore file.

1. Commit your latest changes in source branch.
1. Checkout to master branch.
1. Sync all the files under the `_site` folder to the root folder of the project.
1. Commit this changes in master branch.
1. Push the changes to the remote master branch
1. Observe that your changes are live, now.
1. Checkout back to source branch to continue developing!

As you can observe, this process can be automatized! Check the following script for that: 

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

When I first started to re-build my personal website, all the automatization tasks were in Gulp.
Rendering pug templates, compiling css files, adding markdown support, syntax highlighing and watcher tasks
were implemented in a short amount of time.

However, I was stuck on the blog index page(http://yaprakayazoglu.com/blog/). Because,
this required an iteration through all the blog posts, getting the summary blocks
and creating a single page from those content. After spending a lot of time to solve this issue, (including to
write a custom gulp task), I switched to read write operations and for loops. 
This gave me the full control over the content.

## TODO List

- [ ] Add _drafts folder to manage the draft files.
- [ ] Remove dependency to GulpJS.
- [ ] Watching files and react on delta changes rather than blindly building all from scratch.
- [ ] Create an npm module for the static content generation part.
- [ ] The `_dev/config.js` file includes configuration variables related to static content generator
and also implementation specific variables. This needs to be separated.
