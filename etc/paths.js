'use strict'
const path = require('path')

// parent folder of paths.js, not exported
const parent = path.resolve(__dirname)

// path to directories
const pathToRoot = path.resolve(parent, '..')
const pathToConfig = path.resolve(pathToRoot, 'config')
const pathToEtc = path.resolve(pathToRoot, 'etc')
const pathToSrc = path.resolve(pathToRoot, 'src')
const pathToBuild = path.resolve(pathToRoot, 'dist')
const pathToNodeModules = path.resolve(pathToRoot, 'node_modules')

// paths to specific files
const pathToSrcIndex = path.resolve(pathToSrc, 'index.ts')
const pathToPathsJs = path.resolve(pathToEtc, 'paths.js')

module.exports = {
  pathToRoot,
  pathToConfig,
  pathToEtc,
  pathToSrc,
  pathToBuild,
  pathToNodeModules,

  pathToSrcIndex,
  pathToPathsJs,
}
