const { Validatable } = require("../build/cjs");

test('constructor', () => {
  expect(() => {
    new Validatable();
  }).not.toThrow();
});

test('validate', () => {
  expect(() => {
    let validatable = new Validatable();
    validatable.validate();
  }).not.toThrow();
});

test('isValid', () => {
  expect(() => {
    let validatable = new Validatable();
    expect(validatable.isValid).toBe(true);
  }).not.toThrow();
});