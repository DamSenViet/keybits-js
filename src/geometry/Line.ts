import Point, { PointJSON } from "./Point";
import { Decimal } from "decimal.js";

export interface LineOptions {
  start: Point,
  end: Point,
}

export interface LineJSON {
  start: PointJSON,
  end: PointJSON,
}

class Line {
  protected _start: Point = new Point({
    x: new Decimal("0"),
    y: new Decimal("0"),
  });
  protected _end: Point = new Point({
    x: new Decimal("0"),
    y: new Decimal("0"),
  });

  public constructor(options: Line | LineOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    const { start, end } = options;
    if (start != null) this.start = new Point(start);
    if (end != null) this.end = new Point(end);
  }

  public get start(): Point {
    const { _start } = this;
    return _start;
  }

  public set start(start: Point) {
    if (!(start instanceof Point)) throw new TypeError();
    this._start = start;
  }

  public get end(): Point {
    const { _end } = this;
    return _end;
  }

  // @ts-ignore
  public set end(end: Point) {
    if (!(end instanceof Point)) throw new TypeError();
    this._end = end;
  }

  public equals(line: Line): boolean {
    const { _start, _end } = this;
    return (_start.equals(line.start) && _end.equals(line.end)) ||
      (_start.equals(line.end) && _end.equals(line.start));
  }

  public fromJSON(json: LineJSON) {
  }

  public toJSON(): LineJSON {
    const { _start, _end } = this;
    return {
      start: _start.toJSON(),
      end: _end.toJSON(),
    };
  }

  // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
  // https://stackoverflow.com/a/60368757/8625882
  public intersection(line: Line): null | Point {
    const { _start, _end } = this;
    // lines cannot be of length 0
    if (_start.equals(_end) || line.start.equals(line.end)) {
      return null;
    }

    const denominator = Decimal.sub(
      line.end.y.sub(line.start.y)
        .mul(_end.x.sub(_start.x)),
      line.end.x.sub(line.start.x)
        .mul(_end.y.sub(_start.y))
    );

    if (denominator.isZero()) return null;

    const ua = Decimal.sub(
      line.end.x.sub(line.start.x)
        .mul(_start.y.sub(line.start.y)),
      line.end.y.sub(line.start.y)
        .mul(_start.x.sub(line.start.x))
    ).div(denominator);
    const ub = Decimal.sub(
      _end.x.sub(_start.x)
        .mul(_start.y.sub(line.start.y)),
      _end.y.sub(_start.y)
        .mul(_start.x.sub(line.start.x))
    ).div(denominator)

    // is the intersection along the segments
    const isAlongSegment = (ua.gte(0) && ua.lte(1) && ub.gte(0) && ub.lte(1));
    if (!isAlongSegment) return null;

    const x = _start.x.add(ua.mul(_end.x.sub(_start.x)));
    const y = _start.y.add(ua.mul(_end.y.sub(_start.y)));
    return new Point({ x, y });
  }

  public intersects(line): boolean {
    return Boolean(this.intersection(line));
  }
}

export default Line;