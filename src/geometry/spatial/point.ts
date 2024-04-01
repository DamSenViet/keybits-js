import { has, merge } from 'lodash-es'

/**
 * Immutable Point.
 */
export interface Point {
  /**
   * The x coordinate of the Point.
   */
  x: number
  /**
   * The y coordinate the Point.
   */
  y: number
}

/**
 * Creates a default Point with overridable options.
 * @param options The overiddable options.
 * @returns The Point with overriden options.
 */
export function createPoint(options: Partial<Point> = {}): Point {
  const defaultOptions: Point = {
    x: 0,
    y: 0,
  }
  return merge({}, defaultOptions, options)
}
