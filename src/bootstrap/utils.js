/**
* Utilities
*
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/


"use strict";


// builtin modules
var fs = require("fs");
var path = require("path");


/**
* Bootstrap Logger
*/
exports.Logger = (function() {
  function Logger(logDiv) {
    this.logDiv = logDiv;
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

  return Logger;
})();


/**
* Return an absolute path from a string and ensure it does exist
*
* @param <_path> -- {String} path to file
* @return {String|null}
*/
exports.getPath = getPath;
function getPath(_path) {
  if (! _path) { return null; }
  _path = path.resolve(_path);
  if (fs.existsSync(_path)) { return _path; }
  return null;
}
