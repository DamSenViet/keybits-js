import { isNumber } from 'lodash'
export interface PointOptions {
  x: number
  y: number
}

export interface PointJSON {
  className: 'Point'
  data: {
    x: number
    y: number
  }
}

/**
 * Immutable Point
 */
export default class Point {
  /**
   * The x coordinate of the Point.
   */
  protected _x: number = 0

  /**
   * The y coordinate of the Point.
   */
  protected _y: number = 0

  /**
   * Instantiates a Point.
   * @param options A configuration Object with 'x' and 'y'.
   */
  public constructor(options?: Point | PointOptions) {
    if (arguments.length <= 0) return
    if (typeof options !== 'object') throw new TypeError()
    let x: number
    let y: number
    if (options instanceof Point) ({ _x: x, _y: y } = options as Point)
    else ({ x, y } = options as PointOptions)
    if (!isNumber(x)) throw new TypeError()
    this._x = x
    if (!isNumber(y)) throw new TypeError()
    this._y = y
  }

  /**
   * Gets the x coordinate of the Point.
   * @returns The x coordinate.
   */
  public getX(): number {
    const { _x } = this
    return _x
  }

  /**
   * Gets the y coordinate of the Point.
   * @returns The y coordinate.
   */
  public getY(): number {
    const { _y } = this
    return _y
  }

  /**
   * Determines whether invoking Point is equivalent to the passed Point.
   * @param point The Point to compare against.
   * @returns Whether the Points are equal representations.
   */
  public equals(point: Point): boolean {
    const { _x, _y } = this
    return _x === point._x && _y === point._y
  }
}
