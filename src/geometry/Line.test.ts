import { expect, test } from 'vitest'
import Line from './Line'
import Point from './Point'

test('constructor', () => {
  expect(() => {
    const line = new Line()
  }).not.toThrow()
  expect(() => {
    // @ts-ignore
    const line = new Line({})
  }).toThrow(TypeError)
  expect(() => {
    // @ts-ignore
    const line = new Line({
      start: new Point(),
    })
  }).toThrow(TypeError)
  expect(() => {
    // @ts-ignore
    const line = new Line({
      end: new Point(),
    })
  }).toThrow(TypeError)
  expect(() => {
    const line = new Line({
      start: new Point(),
      end: new Point(),
    })
  }).not.toThrow()
  expect(() => {
    const line = new Line(undefined)
  }).toThrow(TypeError)
})

test('getStart', () => {
  expect(() => {
    const line = new Line()
    expect(
      line.getStart().equals(
        new Point({
          x: 0,
          y: 0,
        }),
      ),
    ).toBe(true)
  }).not.toThrow()
  expect(() => {
    const line = new Line({
      start: new Point({
        x: 7,
        y: 7,
      }),
      end: new Point({
        x: 7,
        y: 7,
      }),
    })
    expect(
      line.getStart().equals(
        new Point({
          x: 7,
          y: 7,
        }),
      ),
    ).toBe(true)
  }).not.toThrow()
})

test('getEnd', () => {
  expect(() => {
    const line = new Line()
    expect(
      line.getEnd().equals(
        new Point({
          x: 0,
          y: 0,
        }),
      ),
    ).toBe(true)
  }).not.toThrow()
  expect(() => {
    const line = new Line({
      start: new Point({
        x: 7,
        y: 7,
      }),
      end: new Point({
        x: 7,
        y: 7,
      }),
    })
    expect(
      line.getEnd().equals(
        new Point({
          x: 7,
          y: 7,
        }),
      ),
    ).toBe(true)
  }).not.toThrow()
})

test('equals', () => {
  // check against initial values
  expect(() => {
    const l1 = new Line()
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 0,
      }),
    })
    const l3 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 0,
      }),
    })
    expect(l1.equals(l2)).toBe(true)
    expect(l1.equals(l2)).toBe(true)
    expect(l2.equals(l3)).toBe(true)
  }).not.toThrow()
  // initial vs instantiated values
  expect(() => {
    const l1 = new Line()
    const l2 = new Line({
      start: new Point({
        x: 7,
        y: 7,
      }),
      end: new Point({
        x: 7,
        y: 7,
      }),
    })
    const l3 = new Line({
      start: new Point({
        x: 7,
        y: 7,
      }),
      end: new Point({
        x: 7,
        y: 7,
      }),
    })
    expect(l1.equals(l2)).toBe(false)
    expect(l1.equals(l3)).toBe(false)
    expect(l2.equals(l3)).toBe(true)
  }).not.toThrow()
  // special case, reversed start and ends
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 7,
        y: 7,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 7,
        y: 7,
      }),
      end: new Point({
        x: 0,
        y: 0,
      }),
    })
    expect(l1.equals(l2)).toBe(true)
  }).not.toThrow()
})

test('intersection', () => {
  // initial, overlapping
  expect(() => {
    const l1 = new Line()
    const l2 = new Line()
    expect(l1.intersection(l2)).toBe(null)
  }).not.toThrow()
  // touching at one point
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 1,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: 1,
      }),
      end: new Point({
        x: 1,
        y: 1,
      }),
    })
    expect(l1.intersection(l2)).toEqual(
      new Point({
        x: 0,
        y: 1,
      }),
    )
  }).not.toThrow()
  // overlapping, parallel
  expect(() => {
    const l1 = new Line()
    const l2 = l1
    expect(l1.intersection(l2)).toBe(null)
  }).not.toThrow()
  // only parallel
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 7,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 1,
        y: 0,
      }),
      end: new Point({
        x: 1,
        y: 7,
      }),
    })
    expect(l1.intersection(l2)).toBe(null)
  }).not.toThrow()
  // actually intersecting at origin
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: -7,
        y: 0,
      }),
      end: new Point({
        x: 7,
        y: 0,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: -7,
      }),
      end: new Point({
        x: 0,
        y: 7,
      }),
    })
    expect(l1.intersection(l2)).toEqual(new Point())
  }).not.toThrow()
})

test('intersects', () => {
  // initial, overlapping
  expect(() => {
    const l1 = new Line()
    const l2 = new Line()
    expect(l1.intersects(l2)).toBe(false)
  }).not.toThrow()
  // touching at one point
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 1,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: 1,
      }),
      end: new Point({
        x: 1,
        y: 1,
      }),
    })
    expect(l1.intersects(l2)).toBe(true)
  }).not.toThrow()
  // overlapping, parallel
  expect(() => {
    const l1 = new Line()
    const l2 = l1
    expect(l1.intersection(l2)).toBe(null)
  }).not.toThrow()
  // only parallel
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 7,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 1,
        y: 0,
      }),
      end: new Point({
        x: 1,
        y: 7,
      }),
    })
    expect(l1.intersects(l2)).toBe(false)
  }).not.toThrow()
  // actually intersecting at origin
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: -7,
        y: 0,
      }),
      end: new Point({
        x: 7,
        y: 0,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: -7,
      }),
      end: new Point({
        x: 0,
        y: 7,
      }),
    })
    expect(l1.intersects(l2)).toBe(true)
  }).not.toThrow()
})

test('crossesOver', () => {
  // touches but not crossing over
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 0,
        y: 1,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: 1,
      }),
      end: new Point({
        x: 1,
        y: 1,
      }),
    })
    expect(l1.crossesOver(l2)).toBe(false)
  }).not.toThrow()
  // crossing over
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: -7,
        y: 0,
      }),
      end: new Point({
        x: 7,
        y: 0,
      }),
    })
    const l2 = new Line({
      start: new Point({
        x: 0,
        y: -7,
      }),
      end: new Point({
        x: 0,
        y: 7,
      }),
    })
    expect(l1.intersects(l2)).toBe(true)
  }).not.toThrow()
})
