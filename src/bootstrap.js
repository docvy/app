/**
* Application bootstrap
*
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/

/* global $ */

(function() {
"use strict";


// built-in modules
var http = require("http");


// npm-installed modules
var express = require("express");


// own modules
var dserver = require("./server");
var options = require("./options.json");


// module variables
var app = express();
var server = http.Server(app);


/**
* Bootstrap Logger
*
*/
var logger = (function() {
  function Logger(selector) {
    this.logDiv = $(selector);
    this.template = "<p><span class='label label-{class}'>" +
      "{alert}</span> {message}</p>";
  }

  Logger.prototype.write = function(_class, message) {
    var string = this.template.replace("{class}", _class)
      .replace("{alert}", _class)
      .replace("{message}", message);
    this.logDiv.append(string);
  };

  Logger.prototype.info = function(message) {
    this.write("info", message);
  };

  Logger.prototype.warn = function(message) {
    this.write("warning", message);
  };

  Logger.prototype.error = function(message) {
    this.write("danger", message);
  };

  return new Logger("#log");
})();


/**
* We shall try to start the server. Any error that occurs is ignored.
*/
try {
  dserver.start({ port: options.server_port }, function() {
    logger.info("server started");
  });
} catch (serverError) {
  logger.error("server failed to start");
}


// serving the static files
app.use(express.static("./viewer"));


/**
* we now start the viewer's server.
*/
server.listen(options.viewer_port, function() {
  logger.info("viewer ready");
  setTimeout(function() {
    window.location = "http://localhost:" + options.viewer_port;
  }, 500);
}).on("error", function() {
  logger.error("viewer failed to start");
});


})();
