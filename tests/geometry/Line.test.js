const {
  Line,
  Point
} = require('../../build/cjs');
const Decimal = require("decimal.js");

test('constructor', () => {
  // string
  expect(() => {
    let [p1, p2] = [["0", "0"], ["10", "10"]];
    let line = new Line([p1, p2]);
    expect(new Point(p1).equals(line.start)).toBe(true);
    expect(new Point(p2).equals(line.end)).toBe(true);
  }).not.toThrow();
  // number
  expect(() => {
    let [p1, p2] = [[-15, -15], [-10, -10]];
    let line = new Line([p1, p2]);
    expect(new Point(p1).equals(line.start)).toBe(true);
    expect(new Point(p2).equals(line.end)).toBe(true);
  }).not.toThrow();
  // decimal
  expect(() => {
    let [p1, p2] = [
      [new Decimal(-10), new Decimal(-10)],
      [new Decimal(-10), new Decimal(-10)]
    ];
    let line = new Line([p1, p2]);
    expect(new Point(p1).equals(line.start)).toBe(true);
    expect(new Point(p2).equals(line.end)).toBe(true);
  }).not.toThrow();
});


test('copy', () => {

});

test('equals', () => {

});

test('toJSON', () => {

});

test('intersection', () => {

});

test('intersects', () => {

});

test('parallel Lines', () => {
  const l1 = new Line([[-10, 0], [10, 0]]);
  const l2 = new Line([[-10, 0], [10, 0]]);
  // const l3 = new Geometry.Line([]);

  // same line intersect itself
  expect(l1.intersects(l1)).toBe(false);
  // same line, shifted over
  expect(l1.intersects(l2)).toBe(false);
});

test('Crossing Lines', () => {
  const l1 = new Line([[-10, 0], [10, 0]]);
  const l2 = new Line([[0, -10], [0, 10]]);
  expect(l1.intersects(l2)).toBe(true);
});