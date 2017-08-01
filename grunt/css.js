module.exports = function (grunt) {
  "use strict";

  grunt.config("sass", {
    scss: {
      files: [{
        expand: true,
        cwd: "scss",
        src: "coss.scss",
        dest: "css",
        ext: ".css"
      }]
    }
  });

  grunt.config("cssmin", {
    dist: {
      files: [{
        expand: true,
        cwd: "css",
        src: "*.css",
        dest: "dist/css",
        ext: ".css"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("css", ["sass", "cssmin"]);

};
