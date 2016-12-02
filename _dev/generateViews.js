var fileSystem = require('fs');
var pug = require('pug');
var fileOperations = require('./utils/fileOperations');
var JSONObject = require('./utils/cloneJSONObject');
var mkdirp = require('mkdirp');

function generateViewIndexPages() {
    var that = this;
    var files = fileOperations.get(this.view.srcFiles, {
        ignore: [
            'node_modules/**',
            '_**/*.pug'
        ]
    });

    // TODO: improve default folder creation logic
    mkdirp(this.blog.blogRootFolder);
    mkdirp(this.tango.tangoRootFolder);
    // TODO: improve the code selection logic
    files.forEach(function(file) {
        var menuItems = JSONObject.clone(that.headerMenuItems);

        if (/^index.pug/.test(file)) {
            menuItems.home['classed'] = 'active';
        }
        // TODO add tango page when there's content
        // } else if (/^tango\/index.pug/.test(file)) {
        //     menuItems.tango['classed'] = 'active';
        // }

        // render the file
        var page = pug.renderFile(file, {
            headerMenuItems: menuItems,
            socialMenuItems: that.socialMenuItems
        });

        var pageUrl = that.blog.outputRootFolder + file.replace('.pug', '.html');
        fileSystem.writeFileSync(pageUrl, page);
    });
}

module.exports = {
    generateViewIndexPages: generateViewIndexPages
};
