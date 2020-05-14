import Validatable from "../Validatable";
import StrictPoint from "./StrictPoint";
import StrictLine from "./Line";
import { equal } from "mathjs";
// types
import { PointString, PointNumber, PointAll, PointJSON } from "./Point";

export type PolygonString = Array<PointString>;
export type PolygonNumber = Array<PointNumber>;
export type PolygonAll = Array<PointAll>;
export type PolygonJSON = [PointJSON, PointJSON];

// cyclical
// composed of all right angles
class StrictPolygon extends Validatable {
  public points: any;

  constructor([...points]: any) {
    super();
    if (arguments.length === 0) return;
    this.points = new Array();
    for (let point of points) {
      this.points.push(new StrictPoint(point));
    }
  }

  copy() {
    return new StrictPolygon(this.toJSON());
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
      return new StrictLine([currPoint.toJSON(), nextPoint.toJSON()]);
    });
  }

  validate() {
    const { points, lines } = this;

    // checking for line intersects
    for (let outer of lines) {
      for (let inner of lines) {
        if (outer === inner) continue;
        if (outer.intersects(inner)) throw new Error();
      }
    }

    // all lines need to form right angles with previous one
    for (let i = 0; i < points.length; ++i) {
      const currPoint = points[i];
      const nextPoint = points[(i + 1) % points.length];
      // not a right angle if both change, only x xor y can be changed
      let xChanged: any = equal(currPoint.x, nextPoint.x);
      let yChanged: any = equal(currPoint.y, nextPoint.y);
      if (!Boolean(xChanged ^ yChanged)) throw new Error();
    }
  }
}

export default StrictPolygon;