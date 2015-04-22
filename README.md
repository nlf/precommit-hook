What is it?
-----------

[![Join the chat at https://gitter.im/nlf/precommit-hook](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nlf/precommit-hook?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This module is a handy little tool that I wrote to help enforce code quality in Node.js projects. It allows you to run any scripts defined in your package.json before a commit is made.

### WARNING: If you already have a `.git/hooks/pre-commit` file, this package will overwrite it.

Breaking changes
----------------

Version 2.0.0 of this module (and the current master branch in this repository) has been updated to use [git-validate](https://github.com/nlf/git-validate), as such the configuration key in package.json will be changed to "pre-commit" with a dash, instead of the old "precommit". All other functionality should work the same.

Why should I use it?
--------------------

No one likes a messy code base. When working on a team, it becomes more and more difficult to make sure that your project's code stays consistent and error free. Since the hook can lint all of the project's code, based on your configuration, you can be sure that at the very least standards are being followed. It can also run build steps, unit tests, or any other script you like.

Having a tool that automates this process has been priceless for us, and has very much improved the quality of our code.

Usage
-----

When you install this project, by default it will create sane `.jshintignore` and `.jshintrc` files for you if they do not already exist. That means it's safe to upgrade the hook after customizing these files, as they will never be overwritten. If you have your jshint configuration in your package.json, then the `.jshintrc` file will not be created ever.

A `.validate.json` file will also be created to provide *defaults* to [git-validate](https://github.com/nlf/git-validate) in order to run your scripts. This configuration is only used if you have not specified your own configuration in `package.json`.

If you need to make changes to the hook's configuration, you should *always* make them in your `package.json` as the `.validate.json` file *will* be overwritten every time the install script is run.

If you do not configure the hook with an array of scripts to run, it will default to `["lint", "validate", "test"]` to maintain backwards compatibility with the old version of this hook. In addition, if a `lint` script is not specified, it will default to `"jshint ."`. If a `lint` script is configured, it will not be overridden. If an array of scripts is configured, it will be used and there will be no default `lint` script.

Package.json
------------

```javascript
{
  "name": "your_project",
  "description": "just an example",
  "scripts": {
    "validate": "./command/to/run",
    "test": "./other/command"
  }
}
```

The contents of the validate and test properties are the shell commands to perform those functions. Having these specified in your package.json also
lends you the ability to be able to run them manually like so:

```
npm run-script validate
npm test
```

These scripts can be any shell executable commands, but must exit with a status code of 0 for success and 1 or greater for failure. The `PATH` environment variable used when executing these scripts will be similar to how npm configures it. That means if you `npm install jshint` locally to your project, you can put simply `"jshint ."` for your script rather than `"./node_modules/.bin/jshint ."`.

You may configure what scripts will be run by the hook, by passing an array of script names to the `"pre-commit"` key in your package.json.

```javascript
{
  "name": "your_project",
  "description": "just an example",
  "scripts": {
    "lint": "jshint --with --different-options",
    "validate": "./command/to/run",
    "test": "./other/command"
  },
  "pre-commit": ["lint", "test"]
}
```

This example would run only the `lint` and `test` scripts, in that order.

Usage
-----

    npm install precommit-hook


Everything else is automatic!

I recommend putting precommit-hook in your project's devDependencies to make sure that anyone who may be contributing to your project will have the hook installed.

```
{
  "name": "your_project",
  "description": "just an example",
  "scripts": {
    "validate": "./command/to/run",
    "test": "./other/command"
  },
  "devDependencies": {
    "precommit-hook": "latest"
  }
}
```

JSHint Defaults
---------------

The default `.jshintrc` looks like the following:

```javascript
{
  "node": true, // node environment

  "curly": true, // enforce using curly braces around blocks
  "latedef": true, // enforce defining a variable before using it
  "quotmark": true, // allows either " or ' but you must be consistent
  "undef": true, // error on use of undefined variables
  "unused": true, // error on variables that are defined but never used
  "trailing": true // error on trailing whitespace
}
```

And the default `.jshintignore` contains only one line

```
node_modules
```

Contact
-------

Like the project? Hate it? Just want to say hi? Find me on twitter [@quitlahok](http://twitter.com/quitlahok)

License
-------

MIT
