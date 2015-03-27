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
var url = require("url");
var gui = require('nw.gui');


// npm-installed modules
var express = require("express");


// own modules
var dserver = require("../server");
var options = require("../options.json");
var utils = require("./utils");


// module variables
var app = express();
var server = http.Server(app);
var logger = new utils.Logger($("#log"));


/**
* We shall try to start the server. Any error that occurs is ignored
* as the user may have already started a docvy-server.
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
app.use("/meta", express.static("./meta"));


/**
* Navigate to Home
*/
function goHome(){
  logger.info("opening current directory");
  setTimeout(function() {
    window.location = "http://localhost:" + options.viewer_port;
  }, 1000);
}


/**
* Navigate to read a file
*/
function readFile(_path) {
  logger.info("opening file at: " + _path);
  setTimeout(function() {
    var _url = "http://localhost:" + options.viewer_port +
      "/#/read" + url.format({ query: { filepath: _path } });
    window.location = _url;
  }, 1000);
}


/**
* Chooses view to show on app startup
*/
function showView() {
  var argv = gui.App.argv;
  var filepath = utils.getPath(argv[0]);
  if (filepath) { return readFile(filepath); }
  return goHome();
}


/**
* We now start the viewer's server. Error is also ignored incase a
* viewer has already been started
*/
server.listen(options.viewer_port, function() {
  logger.info("viewer ready");
  showView();
}).on("error", function() {
  logger.error("viewer failed to start");
  showView();
});


})();
