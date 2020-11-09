import { Polygon, PolygonOptions, Point, PolygonJSON } from "../../../src/geometry";
import Decimal from "decimal.js";

test('constructor', () => {
  expect(() => {
    const polygon = new Polygon();
  }).not.toThrow();
});


test('get points', () => {
  expect(() => {
    const polygon = new Polygon();
    const points = [[0, 0], [0, 1], [1, 1], [1, 0]].map((coord) => {
      return new Point({
        x: new Decimal(coord[0]),
        y: new Decimal(coord[1]),
      })
    });
    expect(polygon.points).toEqual(points);
  }).not.toThrow();
});


test('get width', () => {
  expect(() => {
    const polygon = new Polygon();
    expect(polygon.width.toNumber()).toEqual(1);
  }).not.toThrow();
});


test('get height', () => {
  expect(() => {
    const polygon = new Polygon();
    expect(polygon.height.toNumber()).toEqual(1);
  }).not.toThrow();
});


test('get representations', () => {

});


test('equals', () => {
  expect(() => {
    const polygon1 = new Polygon();
    const polygon2 = new Polygon({});
    const polygon3 = new Polygon({
      points: [[0, 0], [0, 1], [1, 1], [1, 0]].map((coord) => {
        return new Point({
          x: new Decimal(coord[0]),
          y: new Decimal(coord[1]),
        })
      }),
    });
    expect(polygon1.equals(polygon2));
    expect(polygon1.equals(polygon3));
    expect(polygon2.equals(polygon3));
  }).not.toThrow();
});


test('fromJSON', () => {
  // correct
  expect(() => {
    const polygonJSON = {
      className: "Polygon",
      data: {
        points: [
          {
            className: "Point",
            data: {
              x: "0",
              y: "0",
            },
          },
          {
            className: "Point",
            data: {
              x: "0",
              y: "1",
            },
          },
          {
            className: "Point",
            data: {
              x: "1",
              y: "1",
            },
          },
          {
            className: "Point",
            data: {
              x: "1",
              y: "0",
            },
          },
        ],
      },
    };
    const polygon = Polygon.fromJSON(<PolygonJSON>polygonJSON);
  }).not.toThrow();
  // wrong className
  expect(() => {
    const polygonJSON = {
      className: "",
      data: {
        points: [
          {
            className: "Point",
            data: {
              x: "0",
              y: "0",
            },
          },
          {
            className: "Point",
            data: {
              x: "0",
              y: "1",
            },
          },
          {
            className: "Point",
            data: {
              x: "1",
              y: "1",
            },
          },
          {
            className: "Point",
            data: {
              x: "1",
              y: "0",
            },
          },
        ],
      },
    };
    const polygon = Polygon.fromJSON(<PolygonJSON>polygonJSON);
  }).toThrow(TypeError);
  // missing points
  expect(() => {
    const polygonJSON = {
      className: "Polygon",
      data: {},
    };
    const polygon = Polygon.fromJSON(<PolygonJSON>polygonJSON);
  }).toThrow(TypeError);
});


test('toJSON', () => {
  expect(() => {
    const points = [[0, 0], [0, 1], [1, 1], [1, 0]]
      .map(([x, y]) => {
        return new Point({
          x: new Decimal(x),
          y: new Decimal(y),
        })
      });
    const polygon = new Polygon({
      points,
    });
    const polygonJSON = polygon.toJSON();
    expect(polygonJSON).toHaveProperty("className", "Polygon");
    expect(polygonJSON).toHaveProperty("data");
    expect(polygonJSON.data).toHaveProperty("points", points.map((point) => {
      return point.toJSON();
    }));
  }).not.toThrow();
});