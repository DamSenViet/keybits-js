"use strict";
const yargs = require('yargs');
const argv = yargs
  .option("development", {
    alias: "d",
    describe: "Use development environemnt",
    type: "boolean"
  })
  .option("production", {
    alias: "p",
    describe: "Use production environment",
    type: "boolean"
  })
  .option("uncompressed", {
    alias: "u",
    describe: "Produce only uncompressed",
    type: "boolean"
  })
  .option("compressed", {
    alias: "c",
    describe: "Produce only compressed",
    type: "boolean"
  })
  .option("analyze", {
    alias: "a",
    describe: "Analyze bundle",
    type: "boolean"
  })
  .conflicts("development", "production")
  .conflicts("umcompressed", "compressed")
  .parse();

const signale = require('signale');
const webpack = require('webpack');
const {
  webpackDevConfig,
  webpackProdConfig
} = require('../config/webpack.config');
const webpackFormatMessages = require('webpack-format-messages');

const compiler = webpack(webpackDevConfig);

// setup hooks
compiler.hooks.done.tap('done', (stats) => {
  const messages = webpackFormatMessages(stats);

  if (!messages.errors.length && !messages.warnings.length) {
    signale.success(`Application compiled`);
  }

  if (messages.errors.length) {
    signale.fatal('Application failed to compile.');
    messages.errors.forEach(e => console.log(e));
    return;
  }

  if (messages.warnings.length) {
    signale.warn('Application compiled with warnings.');
    messages.warnings.forEach(w => console.log(w));
  }
});

// async IIFE
(async () => {
  await new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      resolve(stats);
    });
  });
})();