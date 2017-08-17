module.exports = function (grunt) {
  "use strict";

  grunt.config("watch", {
    sass: {
      files: ["scss/*.scss"],
      tasks: ["css"]
    },
    js: {
      files: ["js/*.js"],
      tasks: ["js"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

};