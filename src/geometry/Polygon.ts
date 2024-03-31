import { has, merge } from 'lodash-es'
import Point from './Point'
import Line, { lineCrossesOver } from './Line'

/**
 * Immutable Simple Polygon
 */
export default interface Polygon {
  points: Point[]
}

/**
 * Discrimination helper identifying a Polygon}.
 * @param obj
 * @returns Whether obj is a Polygon.
 */
export function isPolygon(obj: any): obj is Polygon {
  return has(obj, ['start', 'end'])
}

/**
 * Creates a default Polygon with overridable options.
 * @param options The overridable options.
 * @returns The Point with overriden options.
 */
export function createPolygon(options: Partial<Polygon> = {}): Polygon {
  const defaultOptions: Polygon = {
    points: [],
  }
  return merge({}, defaultOptions, options)
}

/**
 * Computes the lines from the Points of the Polygon.
 */
export function polygonLines(polygon: Polygon): Line[] {
  const lines: Line[] = []
  for (let i: number = 0; i < polygon.points.length; ++i) {
    const start: Point = polygon.points[i]
    const end: Point = polygon.points[(i + 1) % polygon.points.length]
    lines.push({ start, end })
  }
  return lines
}

/**
 * Computes the bounding width of the Polygon.
 */
export function polygonBoundingWidth(polygon: Polygon): number {
  let lowest: number = Infinity
  let highest: number = -Infinity
  for (const point of polygon.points) {
    if (point.x < lowest) lowest = point.x
    if (point.x > highest) highest = point.x
  }
  return highest - lowest
}

/**
 * Computes the bounding height of the Polygon.
 */
export function polygonBoundingHeight(polygon: Polygon): number {
  let lowest: number = Infinity
  let highest: number = -Infinity
  for (const point of polygon.points) {
    if (point.y < lowest) lowest = point.y
    if (point.y > highest) highest = point.y
  }
  return highest - lowest
}

/**
 * Determines whether invoking Polygon overlaps the passed Polygon
 * @param polygonA The base Polygon.
 * @param polygonB The Polygon to compare against.
 * @returns Whether the Polygons overlap.
 */
export function polygonOverlaps(polygonA: Polygon, polygonB: Polygon): boolean {
  const linesA: Array<Line> = polygonLines(polygonA)
  const linesB: Array<Line> = polygonLines(polygonB)
  for (const lineA of linesA) {
    for (const lineB of linesB) {
      if (lineCrossesOver(lineA, lineB)) return true
    }
  }
  return false
}
