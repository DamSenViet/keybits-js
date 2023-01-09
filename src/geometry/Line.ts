import Ajv from "ajv";
import lineSchema from "./Line.schema";
import Point, { PointJSON } from "./Point";

export interface LineOptions {
  start: Point,
  end: Point,
};

export interface LineJSON {
  className: "Line",
  data: {
    start: PointJSON,
    end: PointJSON,
  },
};

/**
 * Immutable Line
 */
export default class Line {
  /**
   * The starting Point of the Line.
   */
  protected _start: Point = new Point({
    x: 0,
    y: 0,
  });

  /**
   * The ending Point of the Line.
   */
  protected _end: Point = new Point({
    x: 0,
    y: 0,
  });


  /**
   * Instantiates a Line.
   * @param options - a configuration Object with 'start' and 'end' as Points.
   */
  public constructor(options?: Line | LineOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    let start: Point;
    let end: Point;
    if (options instanceof Line)
      ({ _start: start, _end: end } = options as Line)
    else
      ({ start, end } = options as LineOptions);
    if (!(start instanceof Point)) throw new TypeError();
    this._start = start;
    if (!(end instanceof Point)) throw new TypeError();
    this._end = end;
  }


  /**
   * Gets the starting Point of the Line.
   */
  public getStart(): Point {
    const { _start } = this;
    return _start;
  }


  /**
   * Gets the ending Point of the Line.
   */
  public getEnd(): Point {
    const { _end } = this;
    return _end;
  }


  /**
   * Determines whether invoking Line is equivalent to passed Line.
   * @param line - The Line to compare against
   * @returns whether the Lines are equal representations
   */
  public equals(line: Line): boolean {
    const { _start, _end } = this;
    return (_start.equals(line._start) && _end.equals(line._end)) ||
      (_start.equals(line._end) && _end.equals(line._start));
  }


  /**
   * Calculates the intersection between invoking Line and passed Line.
   * @remarks
   * line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
   * https://stackoverflow.com/a/60368757/8625882
   * @param line - the Line to check for intersection against
   * @returns the Point at which the lines intersect and null if they don't
   */
  public intersection(line: Line): null | Point {
    const { _start, _end } = this;
    // lines cannot be of length 0
    if (_start.equals(_end) || line._start.equals(line._end)) {
      return null;
    }

    const denominator: number = (
      (line._end.getY() - line._start.getY()) *
      (_end.getX() - _start.getX())
    ) - (
        (line._end.getX() - line._start.getX()) *
        (_end.getY() - _start.getY())
      );

    if (denominator === 0) return null;

    const ua: number = ((
      (line._end.getX() - line._start.getX()) *
      (_start.getY() - line._start.getY())
    ) - (
        (line._end.getY() - line._start.getY()) *
        (_start.getX() - line._start.getX())
      )) / denominator;
    const ub: number = ((
      (_end.getX() - _start.getX()) *
      (_start.getY() - line._start.getY())
    ) - (
        (_end.getY() - _start.getY()) *
        (_start.getX() - line._start.getX())
      )) / denominator;

    // is the intersection along the segments
    const isAlongSegment: boolean = (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1);
    if (!isAlongSegment) return null;

    const x: number = _start.getX() + ua * (_end.getX() - _start.getX());
    const y: number = _start.getY() + ua * (_end.getY() - _start.getY());
    return new Point({ x, y });
  }


  /**
   * Determines whether invoking Line has an intersection with passed Line.
   * @param line - the Line to check against
   * @returns whether there is an intersection
   */
  public intersects(line: Line): boolean {
    return Boolean(this.intersection(line));
  }


  /**
   * Determines whether invoking Line crosses over with passed Line.
   * @param line the Line to check against
   * @returns whether lines intersection
   */
  public crossesOver(line: Line): boolean {
    const { _start, _end } = this;
    const intersection = this.intersection(line);
    if (intersection == null) return false;
    if (
      intersection.equals(_start) ||
      intersection.equals(_end) ||
      intersection.equals(line._start) ||
      intersection.equals(line._end)
    ) return false;
    return true;
  }

  /**
   * Creates a Line from a JSON object. The JSON must match Line schema
   * for the method to succeed.
   * @param lineJSON - the Line formatted JSON
   * @returns the Line represented by the JSON
   */
  public static fromJSON(lineJSON: LineJSON): Line {
    // verify with ajv
    const ajv = new Ajv();
    if (!ajv.validate(lineSchema, lineJSON)) throw new TypeError();
    const { start: startJSON, end: endJSON } = lineJSON.data;
    const start: Point = Point.fromJSON(startJSON);
    const end: Point = Point.fromJSON(endJSON);
    return new Line({ start, end });
  }


  /**
   * Creates a JSON object from invoking  Line.
   * @returns the JSON representation of the Line.
   */
  public toJSON(): LineJSON {
    const { _start, _end } = this;
    return {
      className: "Line",
      data: {
        start: _start.toJSON(),
        end: _end.toJSON(),
      },
    };
  }
};