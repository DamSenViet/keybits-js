import { expect, test } from 'vitest'
import Polygon, { PolygonJSON } from './Polygon'
import Point from './Point'

test('constructor', () => {
  expect(() => {
    const polygon = new Polygon()
  }).not.toThrow()
})

test('getPoints', () => {
  expect(() => {
    const polygon = new Polygon()
    const points = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ].map((coord) => {
      return new Point({
        x: coord[0],
        y: coord[1],
      })
    })
    expect(polygon.getPoints()).toEqual(points)
  }).not.toThrow()
})

test('getLines', () => {})

test('getBoundingWidth', () => {
  expect(() => {
    const polygon = new Polygon()
    expect(polygon.getBoundingWidth()).toEqual(1)
  }).not.toThrow()
})

test('getBoundingHeight', () => {
  expect(() => {
    const polygon = new Polygon()
    expect(polygon.getBoundingHeight()).toEqual(1)
  }).not.toThrow()
})

test('getRepresentations', () => {})

test('equals', () => {
  expect(() => {
    const polygon1 = new Polygon()
    const polygon2 = new Polygon({
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ].map((coord) => {
        return new Point({
          x: coord[0],
          y: coord[1],
        })
      }),
    })
    const polygon3 = new Polygon({
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ].map((coord) => {
        return new Point({
          x: coord[0],
          y: coord[1],
        })
      }),
    })
    expect(polygon1.equals(polygon2))
    expect(polygon1.equals(polygon3))
    expect(polygon2.equals(polygon3))
  }).not.toThrow()
})

test('overlaps', () => {})
