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
  library: "KeyLabsSerial",
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


const tsRuleDev = {
  test: /\.tsx?$/i,
  use: [
    babelLoaderDev,
    'ts-loader',
  ],
  exclude: pathToNodeModules,
};


const tsRuleProd = {
  ...tsRuleDev,
  use: [
    babelLoaderProd,
    'ts-loader'
  ]
};


const sourceMapRule = {
  enforce: "pre",
  test: /\.js$/i,
  loader: "source-map-loader"
};

const rulesDev = [
  tsRuleDev,
  sourceMapRule,
];


const rulesProd = [
  tsRuleProd,
  sourceMapRule,
];


const webpackDevConfigCJS = {
  target: "node",
  mode: "development",
  devtool: "source-map",
  entry,
  output: outputCJS,
  module: {
    rules: rulesDev
  },
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