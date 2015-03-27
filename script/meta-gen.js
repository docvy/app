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
var mkdirp = require("mkdirp");


// module variables
var root = path.resolve(__dirname + "/..");
var packageJson = require("../src/package.json");
var licensePath = path.join(root, "LICENSE");
var license = fs.readFileSync(licensePath, { encoding: "utf8" });
var dest = path.join(root, "build", "meta");
var metadata = { };


function getComponentPkgJson(componentName) {
  try {
    return require("../build/" + componentName + "/package.json");
  } catch (err) {
    return require("../src/" + componentName + "/package.json");
  }
}


// adding data
metadata.name = packageJson.name;
metadata.version = packageJson.version;
metadata.description = packageJson.description;
metadata.homepage = packageJson.homepage;
metadata.components = {
  "docvy-cache": getComponentPkgJson("" +
    "server/node_modules/docvy-cache").version,
  "docvy-plugin-installer": getComponentPkgJson("" +
    "server/node_modules/docvy-plugin-installer").version,
  "docvy-server": getComponentPkgJson("server").version,
  "docvy-viewer": getComponentPkgJson("viewer").version
};
metadata.license = license;


// creating the destination directory is it is not existant
mkdirp.sync(dest);


// writing the metadata file
var meta_file = path.join(dest, "metadata.json");
fs.writeFileSync(meta_file, JSON.stringify(metadata));
