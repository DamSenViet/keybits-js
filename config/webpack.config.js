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
  library: "KeyLabsSerial",
  path: pathToBuild,
  filename: "index.js",
};

const outputCJS = {
  ...output,
  libraryTarget: "commonjs",
  path: pathToBuildCJS,
};

const outputUMD = {
  ...output,
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


const rulesDev = [
  tsRuleDev,
];


const rulesProd = [
  tsRuleProd,
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