var glob = require('glob');

function getFileNames(fileSourceGlob, options) {
    return glob.sync(fileSourceGlob, options);
}

module.exports = {
    get: getFileNames
};
