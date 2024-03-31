import { expect, test } from 'vitest'
import { createPoint } from './Point'
import { createTransform, apply, unapply } from './Transform'

test('apply', () => {
  expect(() => {
    // default
    const p1 = createPoint()
    const transformation = createTransform({
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    })
    const transformedP1 = apply(transformation, p1)
    expect(transformedP1.x).toBe(0)
    expect(transformedP1.y).toBe(0)
  })
  // translate
  expect(() => {
    const p1 = createPoint()
    const transformation = createTransform({
      originX: 0,
      originY: 0,
      translateX: 1,
      translateY: 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    })
    const transformed = apply(transformation, p1)
    expect(transformed.x).toBe(1)
    expect(transformed.y).toBe(1)
  })
  // scale
  expect(() => {
    const p1 = createPoint({
      x: 1,
      y: 1,
    })
    const transformation = createTransform({
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      rotation: 0,
      scaleX: 2,
      scaleY: 2,
    })
    const transformed = apply(transformation, p1)
    expect(transformed.x).toBe(2)
    expect(transformed.y).toBe(2)
  })
  // rotate
  expect(() => {
    const p1 = createPoint({
      x: 0,
      y: 1,
    })
    const transformation = createTransform({
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      rotation: 90,
      scaleX: 1,
      scaleY: 1,
    })
    const transformed = unapply(transformation, p1)
    // check based on precision places due to inherent precision error
    expect(transformed.x).toBeCloseTo(1, 3)
    expect(transformed.y).toBeCloseTo(0, 3)
  })
})
