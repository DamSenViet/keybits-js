import { expect, test } from 'vitest'
import Point from './Point'

test('constructor', () => {
  expect(() => {
    const point = new Point()
  }).not.toThrow()
  expect(() => {
    // @ts-ignore
    const point = new Point({})
  }).toThrow(TypeError)
  expect(() => {
    // @ts-ignore
    const point = new Point({ x: 7 })
  }).toThrow(TypeError)
  expect(() => {
    // @ts-ignore
    const point = new Point({ y: 7 })
  }).toThrow(TypeError)
  expect(() => {
    const point = new Point({ x: 7, y: 7 })
  }).not.toThrow()
  expect(() => {
    const point = new Point(undefined)
  }).toThrow(TypeError)
  expect(() => {
    const point = new Point({ x: 0, y: 0 })
  }).not.toThrow(TypeError)
})

test('getX', () => {
  expect(() => {
    const point = new Point()
    expect(point.getX()).toBe(0)
  }).not.toThrow()
  expect(() => {
    const point = new Point({ x: 7, y: 7 })
    expect(point.getX()).toBe(7)
  }).not.toThrow()
})

test('getY', () => {
  expect(() => {
    const point = new Point()
    expect(point.getY()).toBe(0)
  }).not.toThrow()
  expect(() => {
    const point = new Point({ x: 7, y: 7 })
    expect(point.getY()).toBe(7)
  }).not.toThrow()
})

test('equals', () => {
  expect(() => {
    const p1 = new Point()
    const p2 = new Point({ x: 0, y: 0 })
    const p3 = new Point({ x: 0, y: 0 })
    expect(p1.equals(p2)).toBe(true)
    expect(p1.equals(p3)).toBe(true)
    expect(p2.equals(p3)).toBe(true)
  }).not.toThrow()
  expect(() => {
    const p1 = new Point()
    const p2 = new Point({ x: 7, y: 0 })
    const p3 = new Point({ x: 7, y: 0 })
    expect(p1.equals(p2)).toBe(false)
    expect(p1.equals(p3)).toBe(false)
    expect(p2.equals(p3)).toBe(true)
  }).not.toThrow()
  expect(() => {
    const p1 = new Point()
    const p2 = new Point({ y: 7, x: 0 })
    const p3 = new Point({ y: 7, x: 0 })
    expect(p1.equals(p2)).toBe(false)
    expect(p1.equals(p3)).toBe(false)
    expect(p2.equals(p3)).toBe(true)
  }).not.toThrow()
})
