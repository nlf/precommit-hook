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
