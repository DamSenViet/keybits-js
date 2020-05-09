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