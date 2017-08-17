module.exports = function (grunt) {
  "use strict";

  grunt.loadTasks("grunt");

  grunt.registerTask("default", ["watch"]);
  
  grunt.registerTask("image", ["clean", "imagemin"]);

  grunt.registerTask("build", ["clean", "css", "js"]);

};

