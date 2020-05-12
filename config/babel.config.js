"use strict";
const { pathToSrc } = require('../etc/paths');

const babelDevConfig = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          "~": pathToSrc
        }
      }
    ],
    ['@babel/plugin-transform-runtime', {}],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};


const babelProdConfig = {
  ...babelDevConfig
};

module.exports = {
  babelDevConfig,
  babelProdConfig
};