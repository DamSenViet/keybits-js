import Keyboard from './Keyboard'
import { ClusterItem } from './Cluster'
import Key from './Key'
import { CapResolver, defaultCapResolver } from './utils/capEntries'
import { Point, Transform, apply } from './geometry'
import { first, flow, isUndefined, last } from 'lodash-es'
import { IModel, IPathLine } from 'makerjs'
import { toWindows } from './utils/array'

/**
 * Traversee of the keyboard item tree.
 */
export type Traverse = (
  items: ClusterItem[],
  callback: (key: Key) => any,
) => void

/**
 * Depth-first traversal of the items.
 */
export const dftKeys: Traverse = (items, callback) => {
  for (const item of items) {
    if (item.className === 'Cluster') dftKeys(item.items, callback)
    else if (item.className === 'Key') callback(item)
  }
}

/**
 * Breadth-first traversal of the items.
 */
export const bftKeys: Traverse = (items, callback) => {
  const queue: typeof items = []
  for (const item of items) queue.push(item)
  while (queue.length > 0) {
    const item = queue.shift()!
    if (item.className === 'Cluster')
      for (const clusterItem of item.items) queue.push(clusterItem)
    else if (item.className === 'Key') callback(item)
  }
}

export type KeyCollector = (keyboard: Keyboard, traverse: Traverse) => Key[]

const collectKeys: KeyCollector = (keyboard, traverse = dftKeys) => {
  const keys: Key[] = []
  traverse(keyboard.keyItems, (key) => {
    keys.push(key)
  })
  return keys
}

/**
 * Also need to apply every set of transformations up until the key.
 * @param key The keycap to calculate
 * @param capResolver Cap resolver to use, automatically set to {@link defaultCapResolver}
 * @param transforms Optional additional transforms to apply to the key coordsinates.
 * @returns The points
 */
export const calcKeyCapCoords = (
  key: Key,
  capResolver: CapResolver = defaultCapResolver,
  transforms: Transform[] = [],
): Point[] => {
  const capLookup = capResolver.get(key.cap.name)
  if (isUndefined(capLookup)) return []

  const capCoords = capLookup.boundingShape

  const transformer = flow(
    transforms.map(
      (transform) => (capCoord: Point) => apply(transform, capCoord),
    ),
  )

  return capCoords.map(transformer)
}

/**
 * Creates a makerjs model to be utilized for export.
 * @param keyCapCoords The set of representative coordinates per keycap.
 */
const keyCapCoordsToModel = (keyCapsCoords: Point[][]): IModel => {
  const rootModel: IModel = { models: {} }
  for (let i = 0; i < keyCapsCoords.length; ++i) {
    const keyCapCoords = keyCapsCoords[i]
    const keyCapLines = toWindows(keyCapCoords)
    const pathModel: MakerJs.IModel = { paths: {} }
    for (let j = 0; j < keyCapLines.length; ++j) {
      const keyCapLine = keyCapLines[j]
      const lineStart = first(keyCapLine)!
      const lineEnd = last(keyCapLine)!
      const lineModel: IPathLine = {
        type: 'line',
        origin: [lineStart.x, lineStart.y],
        end: [lineEnd.x, lineEnd.y],
      }
      pathModel.paths![`line${j}`] = lineModel
    }
    rootModel.models![`key${i}`] = pathModel
  }
  return rootModel
}
