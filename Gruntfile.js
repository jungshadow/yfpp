/*global module:false*/
module.exports = function(grunt) {

    // Configure grunt
    grunt.initConfig({
        // Some useful example paths
        lessPath: "less/",
        jsPath: "js/",
        jsIncludesPath: "<%= jsPath %>includes/",
        jsVendorPath: "<%= jsPath %>vendor/",
        cssPath: "css/",
        minJSPath: "js/min/",

        // Generate our main.css file from our style.less file
        less: {
            development: {
                options: {
                    paths: ["<%= lessPath %>"],
                    cleancss: false,
                },
                files: {
                    "<%= cssPath %>style.css": "<%= lessPath %>style.less"
                }
            },
        },

        // Concat all javascript files into one big javascript file
        concat: {
            options: {
                stripBanners: false
            },

            base: {
                src: [
                    '<%= jsVendorPath %>handlebars-v2.0.0.min.js',
                    '<%= jsVendorPath %>amplify-v1.1.2.min.js',
                    '<%= jsPath %>script.js',
                    '<%= jsIncludesPath %>process_request.js',
                    '<%= jsIncludesPath %>social.js',
                    '<%= jsIncludesPath %>navigation.js',
                    '<%= jsIncludesPath %>display.js',
                    '<%= jsIncludesPath %>init_site.js',
                    '<%= jsIncludesPath %>results.js',
                    '<%= jsIncludesPath %>analytics.js'
                ],
                dest: '<%= minJSPath %>main.js'
            },
        },

        /*
        // Minify javascript files
        uglify: {
            options: {
                report: 'min',
                drop_console: true
            },
            base: {
                files: [{
                    expand: true,
                    cwd: '<%= minJSPath %>',
                    src: ['main.js', '!*.min.js'],
                    dest: '<%= minJSPath %>',
                    ext: '.min.js'
                }]
            }
        },*/

        // Lint our javascript
        jshint: {
            options: {
                curly: false,
                eqeqeq: false,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                "-W041": true,
                "-W098": true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true
                }
            },
            src: [
                '<%= jsPath %>*.js',
                '<%= jsIncludesPath %>*.js'
                ]
        },

        // Compile our codekit files
        codekit: {
            index: {
                src: 'index.kit',
                dest: 'index.html'
            }
        },

        // Watch for changes. Supports livereload on port 35729 (the default)
        watch: {
            css: {
                files: ['<%= lessPath %>**/*.less'],
                tasks: ['less'],
                options: {
                  livereload: true,
                },
            },
            js: {
                files: [
                    '<%= jsPath %>*.js',
                    '<%= jsIncludesPath %>*.js'
                ],
                tasks: ['js'],
                options: {
                  livereload: true,
                },
            },
            codekit: {
                files: ['index.kit', '**/*.kit'],
                tasks: ['html'],
                options: {
                  livereload: true,
                }
            }
        }

    });

    // Load all our easy-to-access tasks using load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // Setup some custom tasks
    grunt.registerTask('default', ['css', 'js']);
    grunt.registerTask('css', ['less']);
    grunt.registerTask('js', [/*'jshint', */'concat', /*'uglify'*/]);
    grunt.registerTask('html', ['codekit']);

};
