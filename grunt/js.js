module.exports = function (grunt) {
  "use strict";

  grunt.config("jshint", {
  	grunt: {
      files: {
        src: ["gruntfile.js", "grunt/*.js", "js/**/*.js"]
      }
    }
  });

  grunt.config("uglify", {
  	dist: {
      files: [{
        expand: true,
        cwd: "js",
        src: "*.js",
        dest: "dist/js",
        ext: ".min.js"
      }]
    },
    options: {
      sourceMap: false
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("js", ["jshint", "clean:js", "uglify"]);

};