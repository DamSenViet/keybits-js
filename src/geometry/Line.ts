import { isEqual, has, merge } from 'lodash-es'
import Point, { createPoint } from './Point'

/**
 * Immutable Simple Line.
 */
export default interface Line {
  start: Point
  end: Point
}

/**
 * Discrimination helper identifying a Line.
 * @param obj
 * @returns Whether obj is a Line.
 */
export function isLine(obj: any): obj is Line {
  return has(obj, ['start', 'end'])
}

/**
 * Creates a default Line with overridable options.
 * @param options The overiddable options.
 * @returns The Line with overriden options.
 */
export function createLine(options: Partial<Line> = {}): Line {
  const defaultOptions: Line = {
    start: createPoint(),
    end: createPoint(),
  }
  return merge({}, defaultOptions, options)
}

/**
 * Calculates the intersection between invoking Line and passed Line.
 * @remarks
 * line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
 * https://stackoverflow.com/a/60368757/8625882
 * @param lineA The base Line.
 * @param lineB The Line to check for intersection against.
 * @returns The Point at which the lines intersect and null if they don't.
 */
export function lineIntersection(lineA: Line, lineB: Line): null | Point {
  // lines cannot be of length 0
  if (lineA.start === lineA.end || lineB.start === lineB.end) {
    return null
  }

  const denominator: number =
    (lineB.end.y - lineB.start.y) * (lineA.end.x - lineA.start.x) -
    (lineB.end.x - lineB.start.x) * (lineA.end.y - lineA.start.y)

  if (denominator === 0) return null

  const ua: number =
    ((lineB.end.x - lineB.start.x) * (lineA.start.y - lineB.start.y) -
      (lineB.end.y - lineB.start.y) * (lineA.start.x - lineB.start.x)) /
    denominator
  const ub: number =
    ((lineA.end.x - lineA.start.x) * (lineA.start.y - lineB.start.y) -
      (lineA.end.y - lineA.start.y) * (lineA.start.x - lineB.start.x)) /
    denominator

  // is the intersection along the segments
  const isAlongSegment: boolean = ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1
  if (!isAlongSegment) return null

  const x: number = lineA.start.x + ua * (lineA.end.x - lineA.start.x)
  const y: number = lineA.start.y + ua * (lineA.end.y - lineA.start.y)
  return { x, y }
}

/**
 * Determines whether invoking Line has an intersection with passed Line.
 * @param lineA The base Line.
 * @param lineB The Line to check against.
 * @returns Whether there is an intersection.
 */
export function lineIntersects(lineA: Line, lineB: Line): boolean {
  return Boolean(lineIntersection(lineA, lineB))
}

/**
 * Determines whether invoking Line crosses over with passed Line.
 * @param lineA The base Line.
 * @param lineB The Line to check against.
 * @returns Whether lines cross over each other.
 */
export function lineCrossesOver(lineA: Line, lineB: Line): boolean {
  const intersection = lineIntersection(lineA, lineB)
  if (intersection == null) return false
  if (
    isEqual(intersection, lineA.start) ||
    isEqual(intersection, lineA.end) ||
    isEqual(intersection, lineB.start) ||
    isEqual(intersection, lineB.end)
  )
    return false
  return true
}
