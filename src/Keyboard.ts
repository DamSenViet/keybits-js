import { merge } from 'lodash'
import { KeyItem } from './KeyItem'

/**
 * A keyboard representing the physical layout of the PCB.
 */
interface KeyboardOptions {
  /**
   * The name of the physical layout.
   */
  name: string

  /**
   * The maintainer's name or alias.
   */
  maintainer: string

  /**
   * A URL to the maintainer's profile.
   */
  maintainerUrl: string

  /**
   * The PCB matrix. Keys will be assigned matrix positions.
   */
  matrix: {
    rows: number
    columns: number
  }

  /**
   * Stores keycodes for each matrix position.
   * We don't store keycodes in the key since the keycodes are owned by the
   * matrix position. Multiple keys can map onto the same matrix position and
   * all those keys must source the keycodes from the same matrix position.
   */
  keycodesIndex: string[][][]

  /**
   * The list of keys, rotaries, and clusters.
   */
  keyItems: Array<KeyItem>
}

interface Keyboard {
  type: 'Keyboard'
  data: KeyboardOptions
}

export function createKeyboard(options: Partial<KeyboardOptions> = {}) {
  const defaultKeyboard: KeyboardOptions = {
    name: '',
    maintainer: '',
    maintainerUrl: '',
    matrix: {
      rows: 0,
      columns: 0,
    },
    keycodesIndex: [],
    keyItems: [],
  }

  return merge({}, defaultKeyboard, options)
}

export default Keyboard
