const loadGruntTasks = require('load-grunt-tasks');
const sass = require('sass');


module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass
      },
      main: {
        files: {
          'dist/vendor.css': 'src/assets/styles/main.scss'
        }
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/vendor.js': 'src/assets/scripts/*.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      }
    },
    clean: {
      build: 'dist'
    }
  });

  loadGruntTasks(grunt);
}
