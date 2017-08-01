module.exports = function (grunt) {
  "use strict";

  grunt.config("htmlbuild", {
    dist: {
      src: "pages/**/*.html",
      dest: "dist/",
      options: {
        basePath: "pages/",
        styles: {
          css: "dist/css/coss.css"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-html-build");

};