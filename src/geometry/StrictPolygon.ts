// imports
import Validatable from "../Validatable";
import StrictPoint from "./StrictPoint";
import StrictLine from "./Line";
// types
import { PointAll, PointJSON } from "./Point";

export type PolygonAll = PointAll[];
export type PolygonJSON = PointJSON[];

// cyclical
// composed of all right angles
class StrictPolygon extends Validatable {
  public points: Array<StrictPoint>;

  public constructor([...points]: PolygonAll = undefined) {
    super();
    if (arguments.length === 0) return;
    this.points = new Array();
    for (let point of points) {
      this.points.push(new StrictPoint(point));
    }
  }

  public copy(): StrictPolygon {
    return new StrictPolygon(this.toJSON());
  }

  public equals(polygon): boolean {
    const { points } = this
    if (points.length !== polygon.points.length) return false;
    const forward = this.toJSON().flat(Infinity);
    const reverse = this.toJSON().reverse().flat(Infinity);
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

  public toJSON(): PolygonJSON {
    const { points } = this;
    return points.map(point => point.toJSON());
  }

  public get lines(): Array<StrictLine> {
    const { points } = this;
    return  points.map((currPoint, i) => {
      const nextPoint = points[(i + 1) % points.length];
      return new StrictLine([currPoint.toJSON(), nextPoint.toJSON()]);
    });
  }

  public validate(): void {
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
      // not a right angle if both change, only x xor y can be different
      let xChanged: boolean = currPoint.x.equals(nextPoint.x);
      let yChanged: boolean = currPoint.y.equals(nextPoint.y);
      if (xChanged === yChanged) throw new Error();
    }
  }
}

export default StrictPolygon;