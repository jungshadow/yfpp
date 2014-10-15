# YFPP #
### The Foul-Mouthed Election Information App ###

Getting Setup For Development
#############################

First off, make sure you have Grunt installed. If you don't, you'll need to run `npm install -g grunt-cli` before going forward

Next, install the node packages listed in `packages.json` by running `npm install` in the directory.

You can then run `grunt watch` to monitor all `.js`, `.less` and `.html` files for changes. If changes are detected while running `grunt watch` your browser will reload.

If you wish to simply compile css/js files, run `grunt css` or `grunt js`

Before committing run `grunt` (no extra commands.) This will compile all javascript and css so they can be deployed.
