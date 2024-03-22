import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// parent folder of paths.js, not exported
const parent = path.resolve(__dirname)

// path to directories
export const pathToRoot = path.resolve(parent, '..')
export const pathToEtc = path.resolve(pathToRoot, 'etc')
export const pathToSrc = path.resolve(pathToRoot, 'src')
export const pathToBuild = path.resolve(pathToRoot, 'dist')
export const pathToNodeModules = path.resolve(pathToRoot, 'node_modules')

// paths to specific files
export const pathToEntry = path.resolve(pathToSrc, 'index.ts')

export default {
  pathToRoot,
  pathToEtc,
  pathToSrc,
  pathToBuild,
  pathToNodeModules,
  pathToEntry,
}