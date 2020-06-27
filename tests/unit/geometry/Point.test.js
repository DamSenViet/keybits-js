const { Point } = require('../../build/cjs');
const Decimal = require('decimal.js');

test('constructor', () => {
  // string
  expect(() => {
    let p = new Point(["10", "10"]);
    expect(p.x.toNumber()).toBe(10);
    expect(p.y.toNumber()).toBe(10);
  }).not.toThrow();
  // number
  expect(() => {
    let p = new Point([10, 10]);
    expect(p.x.toNumber()).toBe(10);
    expect(p.y.toNumber()).toBe(10);
  }).not.toThrow();
  // Decimal
  expect(() => {
    let p = new Point([new Decimal(10), new Decimal(10)]);
    expect(p.x.toNumber()).toBe(10);
    expect(p.y.toNumber()).toBe(10);
  }).not.toThrow();
});

test('equals', () => {
  // same points
  expect(() => {
    // itself
    let p1 = new Point([0, 0]);
    let p2 = new Point([0, 0]);
    expect(p1.equals(p1)).toBe(true);
    expect(p2.equals(p2)).toBe(true);
  }).not.toThrow();
  // different instances, same points
  expect(() => {
    let p1 = new Point([3.14, 3.14]);
    let p2 = new Point([3.14, 3.14]);
    expect(p1.equals(p2)).toBe(true);
    expect(p2.equals(p1)).toBe(true);
  }).not.toThrow();
  // different points
  expect(() => {
    let p1 = new Point([new Decimal(0), new Decimal(0)]);
    let p2 = new Point([new Decimal(10), new Decimal(10)]);
    expect(p1.equals(p2)).toBe(false);
    expect(p2.equals(p1)).toBe(false);
  }).not.toThrow();
});

test('toJSON', () => {

});