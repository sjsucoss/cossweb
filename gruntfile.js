module.exports = function (grunt) {
  "use strict";

  grunt.loadTasks("grunt");

  // grunt.registerTask("default", ["watch"]);

  grunt.registerTask("default", ["clean", "css", "htmlbuild"]);
  
};

