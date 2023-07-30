/**
 * @file The pipeline from a keyboard to a modular line drawing.
 */

import Keyboard from "./Keyboard";
import Cluster, { ClusterItem } from "./Cluster";
import { KeyItem } from "./KeyItem";
import Key from "./Key";
import Swappable from "./Swappable";


type Traversal = (
  items: (
    KeyItem[] |
    ClusterItem[]
  ),
  callback: (key: Key) => any,
) => void;

/**
 * Depth-first traversal of the items.
 */
export const dftKeys: Traversal = (
  items,
  callback,
) => {
  for (const item of items) {
    if (item instanceof Cluster)
      dftKeys(item.items, callback);
    else if (item instanceof Swappable) {
      dftKeys(item.options, callback);
    }
    else if (item instanceof Key)
      callback(item);
  }
};

/**
 * Breadth-first traversal of the items.
 */
export const bftKeys: Traversal = (
  items,
  callback,
) => {
  const queue = [];
  for (const item of items)
    queue.push(item);
  while (queue.length > 0) {
    const item = queue.shift();
    if (item instanceof Cluster)
      for (const clusterItem of item.items)
        queue.push(clusterItem);
    else if (item instanceof Swappable)
      for (const swappableOption of item.options)
        queue.push(swappableOption);
    else if (item instanceof Key)
      callback(item);
  }
};


type KeyCollector = (keyboard: Keyboard, traversal: Traversal) => Key[];

const collectKeys: KeyCollector = (
  keyboard,
  traversal = dftKeys,
) => {
  const keys: Key[] = [];
  traversal(
    keyboard.keyItems,
    (key) => { keys.push(key); }
  );
  return keys;
};
