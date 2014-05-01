var path = require('path');
var exec = require('child_process').exec;

// use git rev-parse to find the .git directory
exports.findGitRoot = function (callback) {
    exec('git rev-parse --show-toplevel', function (err, stderr) {
        if (err) {
            return callback(err);
        }

        callback(null, stderr.trim());
    });
};

// traverse from this module's directory upwards until you find
// the project root, which is the first directory whose parent is
// *not* named node_modules
exports.findProjectRoot = function (base) {
    base = base || __dirname;
    var dir = path.resolve(base, '..');

    if (path.basename(dir) !== 'node_modules') {
        return dir;
    }

    return exports.findProjectRoot(dir);
};

exports.findPackageJson = function () {
    var dir = exports.findProjectRoot();

    return path.join(dir, 'package.json');
};
