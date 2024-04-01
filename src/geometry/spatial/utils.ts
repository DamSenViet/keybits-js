import { has } from 'lodash-es'
import { Point } from './point'
import { Line } from './line'
import { Polygon } from './polygon'

/**
 * Discrimination helper identifying a Polygon}.
 * @param obj
 * @returns Whether obj is a Polygon.
 */
export function isPolygon(obj: any): obj is Polygon {
  return has(obj, ['start', 'end'])
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
 * Discrimination helper identifying a Line.
 * @param obj
 * @returns Whether obj is a Line.
 */
export function isLine(obj: any): obj is Line {
  return has(obj, ['start', 'end'])
}
