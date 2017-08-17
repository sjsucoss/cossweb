module.exports = function (grunt) {
  "use strict";

  grunt.config("imagemin", {
    dynamic: {
      options: {
        progressive: true
      },
      files: [{
        expand: true,
        cwd: "pics",
        src: ["**/*.{gif,jpg,png}"],
        dest: "dist/pics"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-imagemin");
  
  grunt.registerTask("pics", ["clean:pics", "imagemin"]);

};