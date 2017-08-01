module.exports = function (grunt) {
  "use strict";

  grunt.config("jshint", {
  	grunt: {
      files: {
        src: ["gruntfile.js", "grunt/*.js"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");

};