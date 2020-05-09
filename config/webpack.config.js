const {
  pathToBuild,
  pathToNodeModules,
  pathToSrcIndex,
} = require('../etc/paths');

const webpackConfig = {
  mode: "development",
  devtool: "source-map",
  entry: pathToSrcIndex,
  output: {
    filename: "script.js",
    path: pathToBuild
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        exclude: pathToNodeModules
      },
    ],
  }
};

module.exports = webpackConfig;