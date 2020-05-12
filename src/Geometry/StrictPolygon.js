import StrictPoint from "~/Geometry/StrictPoint";
import Line from "~/Geometry/Line";

// cyclical
// composed of all right angles
class StrictPolygon {
  constructor([...points]) {
    this.points = new Array();
    for (let point of points) {
      this.points.push(new StrictPoint(point));
    }
  }

  copy() {
    const { points } = this;
    return new Polygon(points.map(point => point.copy()));
  }

  equals(polygon) {
    const { points } = this
    if (points.length !== polygon.points.length) return false;
    const forward = this.toJSON().flat(Infinity);
    const reverse = this.toJSON().reverse().flat(Infinity)
    const flat = polygon.toJSON().flat(Infinity);

    // compare
    for (let order in [forward, reverse]) {
      let matchedAll = true;
      for (let i; i < order.length; ++i)
        if (order[i] !== flat[i]) matchedAll = false;
      if (matchedAll) return true;
    }
    return false;
  }

  toJSON() {
    const { points } = this;
    return points.map(point => point.toJSON());
  }

  get lines() {
    const { points } = this;
    return  points.map((currPoint, i) => {
      const nextPoint = points[(i + 1) % points.length];
      return new Line([currPoint.toJSON(), nextPoint.toJSON()]);
    });
  }

  validate() {
    const { points, lines } = this;

    // checking for line intersects
    for (let outer of lines) {
      for (let inner of lines) {
        if (outer === inner) continue;
        if (Line.intersects(outer, inner)) throw new Error();
      }
    }

    // all lines need to form right angles with previous one
    for (let i = 0; i < points.length; ++i) {
      const currPoint = points[i];
      const nextPoint = points[(i + 1) % points.length];
      // not a right angle if both change, exactly 1 changes
      const xChanged = (currPoint.x === nextPoint.x);
      const yChanged =  (currPoint.y === nextPoint.y);
      if (!Boolean(xChanged ^ yChanged)) throw new Error();
    }
  }

  get isValid() {
    try {
      this.validate();
      return true;
    }
    catch (error) {
      return false;
    }
  }
}

export default StrictPolygon;