import { expect, test } from 'vitest'
import { isEqual } from 'lodash'
import { createPoint } from './Point'
import {
  createLine,
  lineIntersection,
  lineIntersects,
  lineCrossesOver,
} from './Line'

test('equals', () => {
  // check against initial values
  expect(() => {
    const l1 = createLine()
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 0,
      }),
    })
    const l3 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 0,
      }),
    })
    expect(isEqual(l1, l2)).toBe(true)
    expect(isEqual(l1, l2)).toBe(true)
    expect(isEqual(l2, l3)).toBe(true)
  })
  // initial vs instantiated values
  expect(() => {
    const l1 = createLine()
    const l2 = createLine({
      start: createPoint({
        x: 7,
        y: 7,
      }),
      end: createPoint({
        x: 7,
        y: 7,
      }),
    })
    const l3 = createLine({
      start: createPoint({
        x: 7,
        y: 7,
      }),
      end: createPoint({
        x: 7,
        y: 7,
      }),
    })
    expect(isEqual(l1, l2)).toBe(false)
    expect(isEqual(l1, l3)).toBe(false)
    expect(isEqual(l2, l3)).toBe(true)
  })
  // special case, reversed start and ends
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 7,
        y: 7,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 7,
        y: 7,
      }),
      end: createPoint({
        x: 0,
        y: 0,
      }),
    })
    expect(isEqual(l1, l2)).toBe(true)
  })
})

test('intersection', () => {
  // initial, overlapping
  expect(() => {
    const l1 = createLine()
    const l2 = createLine()
    expect(lineIntersection(l1, l2)).toBe(null)
  })
  // touching at one point
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 1,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: 1,
      }),
      end: createPoint({
        x: 1,
        y: 1,
      }),
    })
    expect(lineIntersection(l1, l2)).toEqual(
      createPoint({
        x: 0,
        y: 1,
      }),
    )
  })
  // overlapping, parallel
  expect(() => {
    const l1 = createLine()
    const l2 = l1
    expect(lineIntersection(l1, l2)).toBe(null)
  })
  // only parallel
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 7,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 1,
        y: 0,
      }),
      end: createPoint({
        x: 1,
        y: 7,
      }),
    })
    expect(lineIntersection(l1, l2)).toBe(null)
  })
  // actually intersecting at origin
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: -7,
        y: 0,
      }),
      end: createPoint({
        x: 7,
        y: 0,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: -7,
      }),
      end: createPoint({
        x: 0,
        y: 7,
      }),
    })
    expect(lineIntersection(l1, l2)).toEqual(createPoint())
  })
})

test('intersects', () => {
  // initial, overlapping
  expect(() => {
    const l1 = createLine()
    const l2 = createLine()
    expect(lineIntersects(l1, l2)).toBe(false)
  })
  // touching at one point
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 1,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: 1,
      }),
      end: createPoint({
        x: 1,
        y: 1,
      }),
    })
    expect(lineIntersects(l1, l2)).toBe(true)
  })
  // overlapping, parallel
  expect(() => {
    const l1 = createLine()
    const l2 = l1
    expect(lineIntersection(l1, l2)).toBe(null)
  })
  // only parallel
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 7,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 1,
        y: 0,
      }),
      end: createPoint({
        x: 1,
        y: 7,
      }),
    })
    expect(lineIntersects(l1, l2)).toBe(false)
  })
  // actually intersecting at origin
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: -7,
        y: 0,
      }),
      end: createPoint({
        x: 7,
        y: 0,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: -7,
      }),
      end: createPoint({
        x: 0,
        y: 7,
      }),
    })
    expect(lineIntersects(l1, l2)).toBe(true)
  })
})

test('crossesOver', () => {
  // touches but not crossing over
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: 0,
        y: 0,
      }),
      end: createPoint({
        x: 0,
        y: 1,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: 1,
      }),
      end: createPoint({
        x: 1,
        y: 1,
      }),
    })
    expect(lineCrossesOver(l1, l2)).toBe(false)
  })
  // crossing over
  expect(() => {
    const l1 = createLine({
      start: createPoint({
        x: -7,
        y: 0,
      }),
      end: createPoint({
        x: 7,
        y: 0,
      }),
    })
    const l2 = createLine({
      start: createPoint({
        x: 0,
        y: -7,
      }),
      end: createPoint({
        x: 0,
        y: 7,
      }),
    })
    expect(lineIntersects(l1, l2)).toBe(true)
  })
})
