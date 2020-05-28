import Validatable from "../Validatable";
import Point from "./Point";
import { Decimal } from "decimal.js";
// types
import { PointAll, PointJSON } from "./Point";

export type LineAll = [PointAll, PointAll];
export type LineJSON = [PointJSON, PointJSON];

class Line extends Validatable {
  public start: Point;
  public end: Point;

  public constructor([start, end]: LineAll = undefined) {
    super();
    if (arguments.length <= 0) return;
    this.start = new Point(start);
    this.end = new Point(end);
  }

  public copy(): Line {
    return new Line(this.toJSON());
  }

  public equals(line): boolean {
    const { start, end } = this;
    return (start.equals(line.start) && end.equals(line.end)) ||
      (start.equals(line.end) && end.equals(line.start));
  }

  public toJSON(): LineJSON {
    const { start, end } = this;
    return [start.toJSON(), end.toJSON()];
  }

  // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
  // https://stackoverflow.com/a/60368757/8625882
  public intersection(line: Line): null | Point {
    const { start, end } = this;
    // lines cannot be of length 0
    if (start.equals(end) || line.start.equals(line.end)) {
      return null;
    }

    const denominator = Decimal.sub(
      line.end.y.sub(line.start.y)
        .mul(end.x.sub(start.x)),
      line.end.x.sub(line.start.x)
        .mul(end.y.sub(start.y))
    );

    if (denominator.isZero()) return null;

    const ua = Decimal.sub(
      line.end.x.sub(line.start.x)
        .mul(start.y.sub(line.start.y)),
      line.end.y.sub(line.start.y)
        .mul(start.x.sub(line.start.x))
    ).div(denominator);
    const ub = Decimal.sub(
      end.x.sub(start.x)
        .mul(start.y.sub(line.start.y)),
      end.y.sub(start.y)
        .mul(start.x.sub(line.start.x))
    ).div(denominator)

    // is the intersection along the segments
    const isAlongSegment = (ua.gte(0) && ua.lte(1) && ub.gte(0) && ub.lte(1));
    if (!isAlongSegment) return

    const x = start.x.add(ua.mul(end.x.sub(start.x)));
    const y = start.y.add(ua.mul(end.y.sub(start.y)));
    return new Point([x, y]);
  }

  public intersects(line): boolean {
    return Boolean(this.intersection(line));
  }
}

export default Line;