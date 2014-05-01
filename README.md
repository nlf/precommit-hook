What is it?
-----------

This module is a handy little tool that I wrote to help enforce code quality in node.js projects. It allows you to run any scripts defined in your package.json before a commit is made.

### WARNING: If you already have a `.git/hooks/pre-commit` file, this package will overwrite it.

Why should I use it?
--------------------

No one likes a messy code base. When working on a team, it becomes more and more difficult to make sure that your project's code stays consistent and error free. Since the hook can lint all of the project's code, based on your configuration, you can be sure that at the very least standards are being followed. It can also run build steps, unit tests, or any other script you like.

Having a tool that automates this process has been priceless for us, and has very much improved the quality of our code.

Usage
-----

When you install this project, by default it will create sane `.jshintignore` and `.jshintrc` files for you.

You can prevent this behavior by modifying your package.json file. If a `lint` script is specified and does not start with the string `"jshint"` OR if you configure the hook to run specific scripts, and that list of scripts does not include `"lint"`, the jshint configuration files will not be created.

For example:

```javascript
{
  "name": "your_project",
  "description": "just an example",
  "scripts": {
    "lint": "some_other_linter ."
  }
}
```

OR

```javascript
{
  "name": "your_project",
  "description": "just an example",
  "precommit": ["test"]
}
```

If you do not configure the hook with an array of scripts to run, it will default to `["lint", "validate", "test"]` to maintain backwards compatibility with the old version of this hook. In addition to that, if a `lint` script is not specified, it will default to `"jshint ."`. If a `lint` script is configured, it will not be overridden. If an array of scripts is configured, it will be used and there will be no default `lint` script.

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

The contents of the validate and test properties are the shell command to be run to perform those functions. Having these specified in your package.json also
lends you the ability to be able to run them manually like so

```
npm run-script validate
npm test
```

These scripts can be any shell executable commands, but must exit with a status code of 0 for success and 1 or greater for failure. The `PATH` environment variable used when executing these scripts will be similar to how npm configures it. That means if you `npm install jshint` locally to your project, you can put simply `"jshint ."` for your script rather than `"./node_modules/.bin/jshint ."`.

You may configure what scripts will be run by the hook, by passing an array of script names to the `"precommit"` key in your package.json.

```javascript
{
  "name": "your_project",
  "description": "just an example",
  "scripts": {
    "lint": "jshint --with --different-options",
    "validate": "./command/to/run",
    "test": "./other/command"
  },
  "precommit": ["lint", "test"]
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

Contact
-------

Like the project? Hate it? Just want to say hi? Find me on twitter [@quitlahok](http://twitter.com/quitlahok)

License
-------

MIT
