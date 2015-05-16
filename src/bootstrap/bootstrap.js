/**
* Application bootstrap
*
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/

/* global $ */

(function() {
"use strict";


// built-in modules
var url = require("url");
var gui = require("nw.gui");


// own modules
var dserver = require("../server");
var options = require("../options.json");
var utils = require("./utils");


// module variables
var logger = new utils.Logger($("#log"));
var baseurl = "../viewer/index.html";


/**
* Navigate to Home
*/
function goHome(){
  logger.info("opening current directory");
  setTimeout(function() {
    window.location = baseurl;
  }, 1000);
}


/**
* Navigate to read a file
*/
function readFile(_path) {
  logger.info("opening file at: " + _path);
  setTimeout(function() {
    var _url = baseurl + "#/read" +
      url.format({ query: { filepath: _path } });
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
* We shall try to start the server. Any error that occurs is ignored
* as the user may have already started a docvy-server.
*/
try {
  dserver.start({ port: options.server_port }, function() {
    logger.info("server started");
    // Show the 1st Page/view
    showView();
  });
} catch (serverError) {
  logger.error("server failed to start");
}


})();
