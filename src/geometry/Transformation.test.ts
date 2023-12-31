import Transformation from './Transformation'
import Point from './Point'

test('apply', () => {
  expect(() => {
    // default
    const p1 = new Point()
    const transformation: Transformation = new Transformation({
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    })
    const transformedP1 = transformation.apply(p1)
    expect(transformedP1.getX()).toBe(0)
    expect(transformedP1.getY()).toBe(0)
  }).not.toThrow()
  // translate
  expect(() => {
    const p1 = new Point()
    const transformation: Transformation = new Transformation({
      originX: 0,
      originY: 0,
      translateX: 1,
      translateY: 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    })
    const transformed = transformation.apply(p1)
    expect(transformed.getX()).toBe(1)
    expect(transformed.getY()).toBe(1)
  }).not.toThrow()
  // scale
  expect(() => {
    const p1 = new Point({
      x: 1,
      y: 1,
    })
    const transformation: Transformation = new Transformation({
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      rotation: 0,
      scaleX: 2,
      scaleY: 2,
    })
    const transformed = transformation.apply(p1)
    expect(transformed.getX()).toBe(2)
    expect(transformed.getY()).toBe(2)
  }).not.toThrow()
  // rotate
  expect(() => {
    const p1 = new Point({
      x: 0,
      y: 1,
    })
    const transformation: Transformation = new Transformation({
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      rotation: 90,
      scaleX: 1,
      scaleY: 1,
    })
    const transformed = transformation.unapply(p1)
    // check based on precision places due to inherent precision error
    expect(transformed.getX()).toBeCloseTo(1, 3)
    expect(transformed.getY()).toBeCloseTo(0, 3)
  }).not.toThrow()
})
