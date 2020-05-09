const yargs = require('yargs');

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  if (err) console.log(err);
});

// (async () => {
//   await new Promise((resolve, reject) => {
//     compiler.run((error, stats) => {
//       if (error) console.log(error);
//       resolve();
//     });
//   });
// });