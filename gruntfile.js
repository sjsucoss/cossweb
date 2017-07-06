/*
 * Based on example provided by Pranav Prakash:
 * https://pranavprakash.net/2014/09/21/automate-git-workflow-with-grunt/
 */

module.exports = function (grunt) {
  "use strict";

  var directory = "/Users/mtw/Projects/sjsucoss/cossweb/";

  grunt.initConfig({

    sass: {
      dist: {
        files: {
          "css/coss.css" : "scss/coss.scss"
        }
      }
    },

    watch: {
      css: {
        files: "**/*.scss",
        tasks: ["sass"]
      }
    },

    // git add .
    gitadd: {
      task: {
        options: {
          all: true,
          cwd: directory
        }
      }
    },

    // git commit -m "Repository updated on <current date time>"
    gitcommit: {
      task: {
        options: {
          message: "Repository updated on <%= grunt.template.today() %>",
          allowEmpty: true,
          cwd: directory
        }
      }
    },

    // git push origin master
    gitpush: {
      task: {
        options: {
          remote: "origin",
          branch: "master",
          cwd: directory
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-git");

  grunt.registerTask("git", ["gitadd", "gitcommit", "gitpush"]);
  grunt.registerTask("default", ["watch"]);
  
};

