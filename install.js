var fs = require('fs'),
    path = require('path');

var existsSync = fs.existsSync || path.existsSync;

var projectPath = path.resolve(__dirname, '../../'),
		projectName = path.basename(projectPath),
    filePath = path.join(__dirname, 'files'),
    pcPath = path.join(projectPath, '.git', 'hooks', 'pre-commit'),
    jsiPath = path.join(projectPath, '.jshintignore'),
    jsrcPath = path.join(projectPath, '.jshintrc'),
		pcModulePath = path.join(projectPath, '../', '.git', 'modules', projectName, 'hooks');

var stats = fs.lstatSync(path.join(projectPath, '.git'));

if (stats.isDirectory() && existsSync(path.join(projectPath, '.git'))) {
    if (existsSync(pcPath)) fs.unlinkSync(pcPath);
    if (!existsSync(path.dirname(pcPath))) fs.mkdirSync(path.dirname(pcPath));
    console.log('Found .git directory, adding pre-commit hook');
    var pcHook = fs.readFileSync(path.join(filePath, 'pre-commit'));
    fs.writeFileSync(pcPath, pcHook);
    fs.chmodSync(pcPath, '755');
} else if (existsSync(pcModulePath)){

	console.log('Found submodule .git directory, adding pre-commit hook');
	var pcHook = fs.readFileSync(path.join(filePath, 'pre-commit'));
	var pcModuleFullPath = path.join(pcModulePath, 'pre-commit');
	fs.writeFileSync(pcModuleFullPath, pcHook);
	fs.chmodSync(pcModuleFullPath, '755');
}

if (!existsSync(jsiPath)) {
    console.log('Did not find a .jshintignore, creating one');
    var jsiFile = fs.readFileSync(path.join(filePath, 'jshintignore'));
    fs.writeFileSync(jsiPath, jsiFile);
}

if (!existsSync(jsrcPath)) {
    console.log('Did not find a .jshintrc, creating one');
    var jsrcFile = fs.readFileSync(path.join(filePath, 'jshintrc'));
    fs.writeFileSync(jsrcPath, jsrcFile);
}
