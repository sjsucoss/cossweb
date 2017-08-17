module.exports = function (grunt) {
  "use strict";

  grunt.config("watch", {
    js: {
      files: ["js/*.js"],
      tasks: ["js"]
    },
    sass: {
      files: ["scss/*.scss"],
      tasks: ["css"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

};