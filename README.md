# Install and Run
## Using [Homebrew](http://brew.sh)

Install [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) and install packages.

```bash
$ brew install node
# If you override python, you may need to tell npm
# to use the system python by adding: --python=/usr/bin/python
$ npm install
# If you've run `gulp install -g` and installed gulp globally you can just type
# `gulp` here
$ node_modules/gulp/bin/gulp.js
```

### Run build

Files inside the `web` directory should never be directly edited. They are compiled versions of the sources files from the `src` directly. Make all your edits and changes to the files contained within the `src` directory.

Running the build process will take all the code in the  `/src` directory and output a complete runnable version of the site to the `/web` directory.

**Building manually**

Any time you make changes to any file in your source code, run a build as follows:

1. Make changes to any file in `/src` (markup, stylesheets, scripts, etc.)
1. On the command line, navigate to the root directory of the project and enter the following:

```
$ gulp
```
The default build will generate uncompressed CSS and JS files. To generate minified versions of the site assets, add the `--prod` flag to the command like so:

```
$ gulp --prod
```

**Building automatically**

You can automatically rebuild any time a source file has changed as follows.

* On the command line, navigate to the root directory of the project and enter the following:

```
$ gulp watch
```

* A persistent file watcher will run. This automatically runs the default build every time it detects a change to a file in `/src` (markup, stylesheets, scripts, etc.)
* The watch task will also spin up a local webserver that will run the site. Changes will automatically be injected into the webpage via Browsersync.

The `--prod` flag can also be used on the watch task to minify the CSS and JS assets.

```
$ gulp watch --prod
```

Happy voting!