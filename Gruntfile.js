'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true
      },
      dist: {
        src: '<%= pkg.main %>',
        dest: 'sinon-ng.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['<%= pkg.main %>', 'test/**/*.js']
      }
    },
    karma: {
      options: {
        frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised'],
        files: [
          './support/angular/angular.js',
          '<%= pkg.main %>',
          './test/**/*.js'
        ],
        browsers: ['PhantomJS'],
        reporters: ['story'],
        autoWatch: false,
        singleRun: false
      },
      continuous: {
        options: {
          singleRun: true
        }
      },
      dev: {
        options: {
          browsers: ['Chrome'],
          background: true
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'build', 'karma:dev:run']
      }
    },
    'bower-install-simple': {
      options: {
        directory: 'support'
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['bower-install-simple', 'jshint', 'build', 'karma:continuous']);
  grunt.registerTask('default', ['bower-install-simple', 'karma:dev:start', 'watch']);
};

