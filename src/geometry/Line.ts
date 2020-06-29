import Ajv from "ajv";
import lineSchema from "./Line.schema";
import Decimal from "decimal.js";
import Point, { PointOptions, PointJSON } from "./Point";

export interface LineOptions {
  start?: PointOptions,
  end?: PointOptions,
};

export interface LineJSON {
  start: PointJSON,
  end: PointJSON,
};

export default class Line {
  protected _start: Point = new Point({
    x: new Decimal(0),
    y: new Decimal(0),
  });
  protected _end: Point = new Point({
    x: new Decimal(0),
    y: new Decimal(0),
  });

  public constructor(options?: Line | LineOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    const { start, end } = options;
    if (start != null) this.start = new Point(start);
    if (end != null) this.end = new Point(end);
  }

  // property getters and setters
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

  public set end(end: Point) {
    if (!(end instanceof Point)) throw new TypeError();
    this._end = end;
  }

  // methods
  public equals(line: Line): boolean {
    const { start, end } = this;
    return (start.equals(line.start) && end.equals(line.end)) ||
      (start.equals(line.end) && end.equals(line.start));
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
    if (!isAlongSegment) return null;

    const x = start.x.add(ua.mul(end.x.sub(start.x)));
    const y = start.y.add(ua.mul(end.y.sub(start.y)));
    return new Point({ x, y });
  }

  public intersects(line): boolean {
    return Boolean(this.intersection(line));
  }

  public fromJSON(lineJSON: LineJSON): Line {
    // verify with ajv
    const ajv = new Ajv();
    if (!ajv.validate(lineSchema, lineJSON)) throw new TypeError();
    const { start: startJSON, end: endJSON } = lineJSON;
    this.start = Point.fromJSON(startJSON);
    this.end = Point.fromJSON(endJSON);
    return this;
  }

  public static fromJSON(lineJSON: LineJSON): Line {
    return new Line().fromJSON(lineJSON);
  }

  public toJSON(): LineJSON {
    const { _start, _end } = this;
    return {
      start: _start.toJSON(),
      end: _end.toJSON(),
    };
  }

  public static toJSON(line: Line): LineJSON {
    return line.toJSON();
  }
};