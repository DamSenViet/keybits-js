/**
 * @file The pipeline from a keyboard to a modular line drawing.
 */

import Keyboard from './Keyboard'
import { ClusterItem } from './Cluster'
import Key from './Key'

type Traverse = (items: ClusterItem[], callback: (key: Key) => any) => void

/**
 * Depth-first traversal of the items.
 */
export const dftKeys: Traverse = (items, callback) => {
  for (const item of items) {
    if (item.className === 'Cluster') dftKeys(item.data.items, callback)
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
      for (const clusterItem of item.data.items) queue.push(clusterItem)
    else if (item.className === 'Key') callback(item)
  }
}

type KeyCollector = (keyboard: Keyboard, traverse: Traverse) => Key[]

const collectKeys: KeyCollector = (keyboard, traverse = dftKeys) => {
  const keys: Key[] = []
  traverse(keyboard.data.keyItems, (key) => {
    keys.push(key)
  })
  return keys
}
