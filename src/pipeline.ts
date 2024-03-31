/**
 * @file The pipeline from a keyboard to a modular line drawing.
 */

import Keyboard from './Keyboard'
import { ClusterItem } from './Cluster'
import Key from './Key'
import { CapEntry, CapResolver } from './utils/capEntries'
import { isUndefined } from 'lodash-es'

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

// take the collected keys and transform them into coordinates

// need a cap resolver

const calcKeyCapCoords = (key: Key, capResolver: CapResolver): number[][] => {
  // for every key

  // compute the set of closed shaped coordinates for every key
  const capLookup = capResolver.get(key.cap.name)
  // skip if lookup is unsuccessful
  if (isUndefined(capLookup)) return []
  // get coordinate list of cap shape

  // apply transform to the coordinates

  const capCoords = calculateCapCoords(capLookup)

  return capCoords
}

const calculateCapCoords = (capEntry: CapEntry): number[][] => {
  // transform the bounding shape (which is an svg) into a set of coordinate points
  return capEntry.boundingShape
}

/**
 * Takes an svg string and transforms it into a list of coordinate points.
 * @param svgStr
 * @returns []
 */
const svgStrToCoords = (svgStr: string): number[][] => {
  // pathologize

  // scale these points to arbitrary u unit.
  return []
}
