"use strict";
const {
  pathToBuild,
  pathToBuildCJS,
  pathToBuildUMD,
  pathToNodeModules,
  pathToSrcIndex,
} = require('../etc/paths');
const {
  babelDevConfig,
  babelProdConfig
} = require('./babel.config');


const entry = pathToSrcIndex;

const output = {
  path: pathToBuild,
  filename: "index.js",
};

// for node environments
const outputCJS = {
  ...output,
  libraryTarget: "commonjs",
  path: pathToBuildCJS,
};

// for browser environments
const outputUMD = {
  ...output,
  // global name in browser
  library: "keylabs",
  libraryTarget: "umd",
  path: pathToBuildUMD,
};

const babelLoaderDev = {
  loader: 'babel-loader',
  options: babelDevConfig
};


const babelLoaderProd = {
  ...babelLoaderDev,
  options: babelProdConfig
};


const jsRuleDev = {
  test: /\.tsx?$/i,
  use: [
    babelLoaderDev,
    'ts-loader',
  ],
  exclude: pathToNodeModules,
};


const jsRuleProd = {
  ...jsRuleDev,
  use: [
    babelLoaderProd,
    'ts-loader',
  ],
};


const rulesDev = [
  jsRuleDev,
];


const rulesProd = [
  jsRuleProd,
];


const resolve = {
  extensions: [".ts", ".js"],
};

const webpackDevConfigCJS = {
  target: "node",
  mode: "development",
  devtool: "source-map",
  entry,
  output: outputCJS,
  module: {
    rules: rulesDev
  },
  resolve,
};


const webpackProdConfigCJS = {
  target: "node",
  mode: "production",
  devtool: false,
  entry,
  output: outputCJS,
  module: {
    rules: rulesProd
  },
  resolve,
};


const webpackDevConfigUMD = {
  ...webpackDevConfigCJS,
  target: "web",
  output: outputUMD,
};


const webpackProdConfigUMD = {
  ...webpackProdConfigCJS,
  target: "web",
  output: outputUMD,
};


module.exports = {
  webpackDevConfigCJS,
  webpackProdConfigCJS,
  webpackDevConfigUMD,
  webpackProdConfigUMD,
};