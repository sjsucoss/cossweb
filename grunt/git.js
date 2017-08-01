/*
 * Based on the work of Pranav Prakash at
 * https://pranavprakash.net/2014/09/21/automate-git-workflow-with-grunt/
 */
module.exports = function (grunt) {
  "use strict";

  var directory = "/Users/mtw/Projects/sjsucoss/cossweb/";

  // git add .
  grunt.config("gitadd", {
    task: {
      options: {
        all: true,
        cwd: directory
      }
    }
  });

  // git commit -m "Repository updated on <current date time>"
  grunt.config("gitcommit", {
    task: {
      options: {
        message: "Repository updated on <%= grunt.template.today() %>",
        allowEmpty: true,
        cwd: directory
      }
    }
  });

  // git push origin master
  grunt.config("gitpush", {
    task: {
      options: {
        remote: "origin",
        branch: "master",
        cwd: directory
      }
    }
  });

  grunt.loadNpmTasks("grunt-git");

  grunt.registerTask("git", ["gitadd", "gitcommit", "gitpush"]);

};
