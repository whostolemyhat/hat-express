module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: './public',
        pkg: grunt.file.readJSON('package.json'),
        tag: {
            banner: '/* <%= pkg.name %> */\n' +
                  '/* Author: <%= pkg.author %> */\n' +
                  '/* Version: v<%= pkg.version %> */\n' +
                  '/* Last updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },

        sass: {
            dev: {
                options: {
                    lineNumbers: true,
                    style: 'expanded',
                    //sourcemap: true,
                    banner: '<%= tag.banner %>'
                },
                files: {
                    '<%= app %>/css/main.css': 'sass/main.scss'
                }
            },

            build: {
                options: {
                    lineNumbers: false,
                    banner: '<%= tag.banner %>',
                    style: 'compressed'
                },
                files: {
                    '<%= app %>/css/main.css': 'sass/main.scss'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= app %>/js/*.js'
            ]
        },

        express: {
            options: {

            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },

            watchsass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:dev']
            },


            watchjs: {
                files: ['<%= app %>/js/*.js', 'routes/*.js'],
                tasks: ['jshint']
            },

            // livereload: {
            //     options: {
            //         livereload: '<%= connect.options.livereload %>'
            //     },
            //     files: [
            //         'static-html/**/*.html',
            //         'static-js/*.js',
            //         '*.css',
            //         'img/*.{gif,jpg,jpeg,png,svg,webp}'
            //     ],
            // }
            // express: {
            // //     files: ['**/*.js', '!<%= app %>/js/*.js'],
            //     tasks: ['express: dev'],
            //     options: {
            //         spawn: false
            //     }
            // }
        },

      // clean: ['assets/js/seapalm.min.js'],

      // concat: {
      //   // options: {
      //   //   separator: ';'
      //   // },
      //   dist: {
      //     src: [
      //       'assets/js/init.js',
      //       'assets/js/settings.js',
      //       'assets/js/utils.js',
      //       'assets/js/plugins/**/*.js',
      //       // skip test files
      //       '!assets/js/plugins/**/tests/*.js'
      //       ],
      //     dest: 'assets/js/seapalm.js'
      //   }
      // },

      // uglify: {
      //   options: {

      //     banner: '/* <%= pkg.name %> */\n' +
      //             '/* Author: <%= pkg.author %> */\n' +
      //             '/* Version: v<%= pkg.version %> */\n' +
      //             '/* Last updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'

      //   },
      //   // dist: {
      //   //   files: {
      //   //     'assets/js/seapalm.min.js': ['<%= concat.dist.dest %>']
      //   //   }
      //   // }
      // }

    });

    // Default Tasks
    // newer: only run if files have changed
    grunt.registerTask('default', ['express:dev', 'watch']);

};