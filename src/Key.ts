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
 * Information about the Cap.
 */
interface Cap {
  color: string
  labels: string[]
  capEntry: CapEntry['name']
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
      capEntry: cherry0100uX0100u.name,
    },
  }
  return {
    className: 'Key',
    data: merge({}, defaultKeyOptions, options),
  }
}

export default Key
