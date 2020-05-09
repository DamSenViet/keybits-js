"use strict";
const path = require('path');

// etc folder, not exported
const pwd = path.resolve(__dirname);

// path to directories
const pathToRoot = path.resolve(pwd, "..");
const pathToConfig = path.resolve(pathToRoot, "config");
const pathToEtc = path.resolve(pathToRoot, "etc");
const pathToSrc = path.resolve(pathToRoot, "src");
const pathToBuild = path.resolve(pathToRoot, "build");
const pathToNodeModules = path.resolve(pathToRoot, "node_modules");

// paths to specific files
const pathToBabelConfig = path.resolve(pathToConfig, "babel.config.js");
const pathToWebpackConfig = path.resolve(pathToConfig, "webpack.config.js");
const pathToSrcIndex = path.resolve(pathToSrc, "index.js")
const pathToPathsJs = path.resolve(pathToEtc, "paths.js");


module.exports = {
  pathToRoot,
  pathToConfig,
  pathToEtc,
  pathToSrc,
  pathToBuild,
  pathToNodeModules,
  pathToBabelConfig,
  pathToWebpackConfig,
  pathToSrcIndex,
  pathToPathsJs
};