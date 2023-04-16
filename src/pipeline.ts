/**
 * @file The pipeline from a keyboard to a modular line drawing.
 */

import Keyboard from "./Keyboard";
import Cluster, { ClusterItem } from "./Cluster";
import { KeyItem } from "./KeyItem";
import Key from "./Key";
import Swappable from "./Swappable";

type KeyCollector = (keyboard: Keyboard) => Key[];

/**
 * Depth-first traversal of the items.
 */
export const dftKeys = (
  items: (
    KeyItem[] |
    ClusterItem[]
  ),
  callback: (key: Key) => any,
): void => {
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
export const bftKeys = (
  items: (
    KeyItem[] |
    ClusterItem[]
  ),
  callback: (key: Key) => any,
): void => {
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


const defaultKeyCollector: KeyCollector = (keyboard) => {
  const keys: Key[] = [];
  dftKeys(
    keyboard.keyItems,
    (key) => { keys.push(key); }
  );
  return keys;
};
