import { merge } from 'lodash-es'
import {
  Point,
  createPoint,
  Line,
  createLine,
  Polygon,
  createPolygon,
  SpatialGeometry,
  isPoint,
  isLine,
  isPolygon,
} from './spatial'

/**
 * Composite Transformation.
 */
export default interface Transform {
  /**
   * Origin X component of the Transformation.
   */
  originX: number
  /**
   * Origin Y component of the Transformation.
   */
  originY: number
  /**
   * Translate X component of the Transformation.
   */
  translateX: number
  /**
   * Translate Y component of the Transformation.
   */
  translateY: number
  /**
   * Rotation of the Transformation.
   */
  rotation: number
  /**
   * Scale X component of the Transformation.
   */
  scaleX: number
  /**
   * Scale Y component of the Transformation.
   */
  scaleY: number
}

/**
 * Creates a default Transformation with overridable options.
 * @param options The overiddable options.
 * @returns The Point with overriden options.
 */
export function createTransform(options: Partial<Transform> = {}): Transform {
  const defaultOptions: Transform = {
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    rotation: 0,
    scaleX: 0,
    scaleY: 0,
  }
  return merge({}, defaultOptions, options)
}

/**
 * Applies the transformation to the geometry.
 * @param point - the point to apply the transformation
 */
export function apply(transform: Transform, point: Readonly<Point>): Point

/**
 * Applies the transformation to the geometry.
 * @param line - the line to apply the transformation
 */
export function apply(transform: Transform, line: Readonly<Line>): Line

/**
 * Applies the transformation to the geometry.
 * @param polygon - the polygon to apply the transformation
 * @returns the polygon with transformations applied
 */
export function apply(transform: Transform, polygon: Readonly<Polygon>): Polygon

/**
 * Applies the transformation to the geometry.
 * @param geometry - the geometry to apply the transformation
 * @returns the geometry with the transformation applied
 */
export function apply(
  transform: Transform,
  geometry: Readonly<SpatialGeometry>,
): any {
  if (isPoint(geometry)) {
    const translated = createPoint({
      x: geometry.x + transform.translateX,
      y: geometry.y + transform.translateY,
    })

    const rotationRadian: number = (transform.rotation * Math.PI) / 180
    const sinTheta: number = Math.sin(rotationRadian)
    const cosTheta: number = Math.cos(rotationRadian)
    const originRelativeX: number = translated.x - transform.originX
    const originRelativeY: number = translated.y - transform.originY

    const rotated = createPoint({
      x:
        originRelativeX * cosTheta -
        originRelativeY * sinTheta +
        transform.originX,
      y:
        originRelativeX * sinTheta +
        originRelativeY * cosTheta +
        transform.originY,
    })

    const scaled = createPoint({
      x: rotated.x * transform.scaleX,
      y: rotated.y * transform.scaleY,
    })

    return scaled
  } else if (isLine(geometry)) {
    return createLine(
      merge(geometry, {
        start: apply(transform, geometry.start),
        end: apply(transform, geometry.end),
      }),
    )
  } else if (isPolygon(geometry)) {
    return createPolygon(
      merge(geometry, {
        points: geometry.points.map((point) => apply(transform, point)),
      }),
    )
  }
}

/**
 * Unapplies the transformation to the geometry.
 * @param point - the point to apply the transformation
 */
export function unapply(transform: Transform, point: Readonly<Point>): Point

/**
 * Unapplies the transformation to the geometry.
 * @param line - the line to apply the transformation
 */
export function unapply(transform: Transform, line: Readonly<Line>): Line

/**
 * Unapplies the transformation to the geometry.
 * @param polygon - the polygon to apply the transformation
 * @returns the polygon with transformations applied
 */
export function unapply(
  transform: Transform,
  polygon: Readonly<Polygon>,
): Polygon

/**
 * Applies the transformation to the geometry.
 * @param geometry - the geometry to apply the transformation
 * @returns the geometry with the transformation applied
 */
export function unapply(
  transform: Transform,
  geometry: Readonly<Point | Line | Polygon>,
): any {
  if (isPoint(geometry)) {
    const unscaled = createPoint(
      merge(geometry, {
        x: geometry.x * (1 / transform.scaleX),
        y: geometry.y * (1 / transform.scaleY),
      }),
    )

    const rotationRadian: number = (-transform.rotation * Math.PI) / 180
    const sinTheta: number = Math.sin(rotationRadian)
    const cosTheta: number = Math.cos(rotationRadian)
    const originRelativeX: number = unscaled.x - transform.originX
    const originRelativeY: number = unscaled.y - transform.originY

    const unrotated = createPoint({
      x:
        originRelativeX * cosTheta -
        originRelativeY * sinTheta +
        transform.originX,
      y:
        originRelativeX * sinTheta +
        originRelativeY * cosTheta +
        transform.originY,
    })

    const untranslated = createPoint({
      x: unrotated.x - transform.translateX,
      y: unrotated.y - transform.translateY,
    })

    return untranslated
  } else if (isLine(geometry)) {
    return createLine(
      merge(geometry, {
        start: apply(transform, geometry.start),
        end: apply(transform, geometry.end),
      }),
    )
  } else if (isPolygon(geometry)) {
    return createPolygon(
      merge(geometry, {
        points: geometry.points.map((point) => apply(transform, point)),
      }),
    )
  }
}
