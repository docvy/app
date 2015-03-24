#!/usr/bin/env node

/**
* Generates metadata
*
* The MIT License (MIT)
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/


"use strict";


// built-in modules
var fs = require("fs");
var path = require("path");


// npm-installed modules
var jade = require("jade");
var mkdirp = require("mkdirp");


// module variables
var root = path.resolve(__dirname + "/..");
var metadata = require("../src/package.json");
var licensePath = path.join(root, "LICENSE");
var license = fs.readFileSync(licensePath, { encoding: "utf8" });
var templatePath = path.join(root, "/src/templates/about.jade");
var dest = path.join(root, "build", "meta");


// creating the destination directory is it is not existant
mkdirp.sync(dest);


// compiling the jade template
jade.renderFile(templatePath, {
  appname: metadata.name,
  version: metadata.version,
  license: license
}, function(err, html) {
  if (err) { throw err; }
  var info_file = path.join(dest, "about.html");
  fs.writeFileSync(info_file, html);
});
