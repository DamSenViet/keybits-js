const { Geometry } = require('../../build/cjs');

test('Parallel Lines', () => {
  const l1 = new Geometry.Line([[-10, 0], [10, 0]]);
  const l2 = new Geometry.Line([[-10, 0], [10, 0]]);
  // const l3 = new Geometry.Line([]);

  // same line intersect itself
  expect(l1.intersects(l1)).toBe(false);
  // same line, shifted over
  expect(l1.intersects(l2)).toBe(false);
});

test('Crossing Lines', () => {
  const l1 = new Geometry.Line([[-10, 0], [10, 0]]);
  const l2 = new Geometry.Line([[0, -10], [0, 10]]);
  expect(l1.intersects(l2)).toBe(true);
});