import { merge } from 'lodash'
import { CapEntry, cherry0100uX0100u } from './utils/capEntries'

/**
 * The 0 index value of the electrical matrix position mapped to the key.
 */
export interface MatrixPosition {
  row: number
  column: number
}

/**
 * The transformation (including the position) of the key.
 */
export interface Transform {
  originX: number
  originY: number
  rotate: number
  translateX: number
  translateY: number
}

/**
 * Cap information..
 */
interface Cap {
  /**
   * A reference by name to the cap entry.
   * Will be resolved at computation time to a CapResolver.
   */
  name: CapEntry['name']
  /**
   * Valid CSS color to apply to the Cap.
   * Relative colors (e.g. cap shadows) will be computed with this as the base color.
   */
  color: string
  /**
   * A list of labels to be rendered on top of the Key.
   */
  labels: string[]
}

/**
 * Overridable options on a Key.
 */
export interface KeyOptions {
  name: string
  matrixPosition: MatrixPosition
  transform: Transform
  cap: Cap
}

/**
 * A Key representing the cap, switch, associated stabilizers and styles.
 */
export interface Key {
  className: 'Key'
  data: KeyOptions
}

/**
 * Creates a default Key with overidable options.
 * @param options The overridable options.
 * @returns The key with overridden options.
 */
export const createKey = (options: Partial<KeyOptions> = {}): Key => {
  const defaultKeyOptions: KeyOptions = {
    name: 'Key',
    matrixPosition: {
      row: 0,
      column: 0,
    },
    transform: {
      originX: 0,
      originY: 0,
      rotate: 0,
      translateX: 0,
      translateY: 0,
    },
    cap: {
      color: '#ffffff',
      labels: [],
      name: cherry0100uX0100u.name,
    },
  }
  return {
    className: 'Key',
    data: merge({}, defaultKeyOptions, options),
  }
}

export default Key
