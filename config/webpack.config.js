"use strict";
const {
  pathToBuild,
  pathToNodeModules,
  pathToSrcIndex,
} = require('../etc/paths');
const {
  babelDevConfig,
  babelProdConfig
} = require('./babel.config');


const entry = pathToSrcIndex;
const output = {
  filename: "script.js",
  path: pathToBuild,
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


const webpackDevConfig = {
  mode: "development",
  devtool: "source-map",
  entry,
  output,
  module: {
    rules: rulesDev
  },
};


const webpackProdConfig = {
  mode: "production",
  devtool: false,
  entry,
  output,
  module: {
    rules: rulesProd
  },
};


module.exports = {
  webpackDevConfig,
  webpackProdConfig
};