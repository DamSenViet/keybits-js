import Keyboard from './Keyboard'
import { ClusterItem } from './Cluster'
import Key from './Key'
import { CapResolver, defaultCapResolver } from './utils/capEntries'
import { Point, Transform, apply } from './geometry'
import { flow, isUndefined } from 'lodash-es'

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
