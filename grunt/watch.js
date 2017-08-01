module.exports = function (grunt) {
  "use strict";

  grunt.config("watch", {
    css: {
      files: "**/*.scss",
      tasks: ["css"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

};