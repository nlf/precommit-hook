var fs = require('fs'),
    path = require('path');

var projectPath = path.resolve(__dirname, '../../'),
    filePath = path.join(__dirname, 'files');

path.exists(path.join(projectPath, '.git'), function (exists) {
    if (exists) {
        path.exists(path.join(projectPath, '.git/hooks/pre-commit'), function (hookExists) {
            if (hookExists) {
                fs.unlinkSync(path.join(projectPath, '.git/hooks/pre-commit'));
            }
            console.log('Found .git directory, adding pre-commit hook');
            fs.createReadStream(path.join(filePath, 'pre-commit')).pipe(fs.createWriteStream(path.join(projectPath, '.git/hooks/pre-commit')));
            fs.chmodSync(path.join(projectPath, '.git/hooks/pre-commit'), '755');
        });
    }
    path.exists(path.join(projectPath, '.jshintignore'), function (exist) {
        if (!exist) {
            console.log('Did not find a .jshintignore, creating one');
            fs.createReadStream(path.join(filePath, 'jshintignore')).pipe(fs.createWriteStream(path.join(projectPath, '.jshintignore')));
        }
        path.exists(path.join(projectPath, '.jshintrc'), function (exis) {
            if (!exis) {
                console.log('Did not find a .jshintrc, creating one');
                fs.createReadStream(path.join(filePath, 'jshintrc')).pipe(fs.createWriteStream(path.join(projectPath, '.jshintrc')));
            }
        });
    });
});

