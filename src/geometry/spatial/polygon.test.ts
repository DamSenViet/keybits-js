import { expect, test } from 'vitest'
import { isEqual } from 'lodash-es'
import { createPoint } from './Point'
import {
  createPolygon,
  polygonBoundingWidth,
  polygonBoundingHeight,
} from './polygon'

test('getPoints', () => {
  expect(() => {
    const polygon = createPolygon()
    const points = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ].map((coord) => {
      return createPoint({
        x: coord[0],
        y: coord[1],
      })
    })
    expect(polygon.points).toEqual(points)
  })
})

test('getLines', () => {})

test('getBoundingWidth', () => {
  expect(() => {
    const polygon = createPolygon()
    expect(polygonBoundingWidth(polygon)).toEqual(1)
  })
})

test('getBoundingHeight', () => {
  expect(() => {
    const polygon = createPolygon()
    expect(polygonBoundingHeight(polygon)).toEqual(1)
  })
})

test('equals', () => {
  expect(() => {
    const polygon1 = createPolygon()
    const polygon2 = createPolygon({
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ].map((coord) => {
        return createPoint({
          x: coord[0],
          y: coord[1],
        })
      }),
    })
    const polygon3 = createPolygon({
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ].map((coord) => {
        return createPoint({
          x: coord[0],
          y: coord[1],
        })
      }),
    })
    expect(isEqual(polygon1, polygon2))
    expect(isEqual(polygon1, polygon3))
    expect(isEqual(polygon2, polygon3))
  })
})

test('overlaps', () => {})
