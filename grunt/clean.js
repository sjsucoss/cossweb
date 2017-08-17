module.exports = function (grunt) {
  "use strict";

  grunt.config("clean", {
    css: ["dist/css/**/*"],
    js: ["dist/js/**/*"],
    pics: ["dist/pics/**/*"],
    sass: ["css/**/*"]
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  
  grunt.registerTask("image", ["clean.pics", "imagemin"]);

};