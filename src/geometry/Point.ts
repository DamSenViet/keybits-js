import { isEqual, has, merge } from 'lodash-es'

/**
 * Immutable Point.
 */
export default interface Point {
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
 * Discrimation helper identifying a Point.
 * @param obj
 * @returns Whether obj is a Point.
 */
export function isPoint(obj: any): obj is Point {
  return has(obj, ['x', 'y'])
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
