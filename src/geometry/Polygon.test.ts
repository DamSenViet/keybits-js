import Polygon, { PolygonJSON } from "./Polygon";
import Point from "./Point";

test('constructor', () => {
  expect(() => {
    const polygon = new Polygon();
  }).not.toThrow();
});


test('getPoints', () => {
  expect(() => {
    const polygon = new Polygon();
    const points = [[0, 0], [0, 1], [1, 1], [1, 0]].map((coord) => {
      return new Point({
        x: coord[0],
        y: coord[1],
      })
    });
    expect(polygon.getPoints()).toEqual(points);
  }).not.toThrow();
});

test('getLines', () => {
});

test('getBoundingWidth', () => {
  expect(() => {
    const polygon = new Polygon();
    expect(polygon.getBoundingWidth()).toEqual(1);
  }).not.toThrow();
});


test('getBoundingHeight', () => {
  expect(() => {
    const polygon = new Polygon();
    expect(polygon.getBoundingHeight()).toEqual(1);
  }).not.toThrow();
});


test('getRepresentations', () => {

});


test('equals', () => {
  expect(() => {
    const polygon1 = new Polygon();
    const polygon2 = new Polygon({
      points: [[0, 0], [0, 1], [1, 1], [1, 0]].map((coord) => {
        return new Point({
          x: coord[0],
          y: coord[1],
        })
      }),
    });
    const polygon3 = new Polygon({
      points: [[0, 0], [0, 1], [1, 1], [1, 0]].map((coord) => {
        return new Point({
          x: coord[0],
          y: coord[1],
        })
      }),
    });
    expect(polygon1.equals(polygon2));
    expect(polygon1.equals(polygon3));
    expect(polygon2.equals(polygon3));
  }).not.toThrow();
});


test('overlaps', () => {

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
          x,
          y,
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