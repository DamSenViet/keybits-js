const { pathToSrc } = require('../etc/paths');

const babelConfig = {
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
    ['@babel/plugin-transform-modules-commonjs', {}]
  ]
};

module.exports = babelConfig;