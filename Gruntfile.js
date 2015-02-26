/**
* Run script for Grunt, task runner
*
* The MIT License (MIT)
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/


exports = module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    jshint: {
      all: [ "Gruntfile.js", "src/*.js" ],
      options: {
        jshintrc: true
      }
    },
    nodewebkit: {
      options: {
        platforms: ["win32", "win64", "osx32", "osx64", "linux32",
          "linux64"],
        buildDir: "./releases",
        buildType: "versioned"
      },
      src: ["./build/**/*"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-node-webkit-builder");

  grunt.registerTask("test", ["jshint"]);
  grunt.registerTask("default", ["test", "nodewebkit"]);
};
