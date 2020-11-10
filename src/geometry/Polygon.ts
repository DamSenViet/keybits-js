import Ajv from "ajv";
import polygonSchema from "./Polygon.schema";
import Decimal from "decimal.js";
import Point, { PointJSON } from "./Point";
import Line from "./Line";

export interface PolygonOptions {
  points: Array<Point>
};

export interface PolygonJSON {
  className: "Polygon",
  data: {
    points: Array<PointJSON>
  },
};

/**
 * Immutable Simple Polygon
 */
export default class Polygon {
  /**
   * The ordered points of the Polygon.
   */
  protected _points: Array<Point> = new Array<Point>(
    new Point({ x: new Decimal(0), y: new Decimal(0) }),
    new Point({ x: new Decimal(0), y: new Decimal(1) }),
    new Point({ x: new Decimal(1), y: new Decimal(1) }),
    new Point({ x: new Decimal(1), y: new Decimal(0) }),
  );


  /**
   * Instantiates a Polygon.
   * @param options - a configuration Object with 'points' as an Array of Points
   */
  constructor(options?: Polygon | PolygonOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    let points: Array<Point>;
    if (options instanceof Polygon)
      ({ _points: points } = options as Polygon);
    else
      ({ points } = options as PolygonOptions);
    if (!(points instanceof Array)) throw new TypeError();
    for (const point of points) {
      if (!(point instanceof Point)) throw new TypeError();
    }
    if (points.length < 3) throw new TypeError();
    // ordered points cannot construct crossing lines that cross over
    const lines: Array<Line> = new Array<Line>();
    for (let i = 0; i < points.length; ++i) {
      const start: Point = points[i];
      const end: Point = points[(i + 1) % points.length];
      lines.push(new Line({ start, end }));
    }
    for (const lineA of lines) {
      for (const lineB of lines) {
        if (lineA === lineB) continue;
        if (lineA.crossesOver(lineB))
          throw new TypeError();
      }
    }
    this._points = <Array<Point>>points.slice();
  }


  /**
   * Gets the ordered Points that make up the Polygon.
   */
  public getPoints(): Array<Point> {
    return this._points.slice();
  }


  /**
   * Get the lines from the Points of the Polygon.
   */
  public lines(): Array<Line> {
    const { _points } = this;
    const lines: Array<Line> = new Array<Line>();
    for (let i: number = 0; i < _points.length; ++i) {
      const start: Point = _points[i];
      const end: Point = _points[(i + 1) % _points.length];
      lines.push(new Line({ start, end }));
    }
    return lines;
  }


  /**
   * Gets the computed bounding width of the Polygon.
   */
  public getBoundingWidth(): Decimal {
    const { _points } = this;
    let lowest: Decimal = new Decimal(Infinity);
    let highest: Decimal = new Decimal(-Infinity);
    for (const point of _points) {
      if (point.getX().lt(lowest)) lowest = point.getX();
      if (point.getX().gt(highest)) highest = point.getX();
    }
    return highest.sub(lowest).abs();
  }


  /**
   * Gets the computed bounding height of the Polygon.
   */
  public getBoundingHeight(): Decimal {
    const { _points } = this;
    let lowest: Decimal = new Decimal(Infinity);
    let highest: Decimal = new Decimal(-Infinity);
    for (const point of _points) {
      if (point.getY().lt(lowest)) lowest = point.getY();
      if (point.getY().gt(highest)) highest = point.getY();
    }
    return highest.sub(lowest).abs();
  }


  /**
   * Gets all equivalent Polygon representations of the Polygon.
   */
  public getRepresentations(): Array<Polygon> {
    const { _points } = this;
    const representations: Array<Polygon> = new Array<Polygon>();
    for (let i = 0; i < _points.length - 1; ++i) {
      // rotate based on i, take from start, add to end
      const copy: Array<Point> = _points.slice();
      const rotating: Array<Point> = copy.splice(0, i);
      copy.push(...rotating);
      // register as new representation
      representations.push(new Polygon({
        points: copy
      }));
    }
    return representations;
  }


  /**
   * Determines whether invoking Polygon is equivalent to passed Polygon.
   * @param polygon - the Polygon to compare against
   * @returns whether the Polygons are equal representations
   */
  public equals(polygon: Polygon): boolean {
    const representationsStrings: Set<string> = new Set(this.getRepresentations()
      .map(polygon => JSON.stringify(polygon)));
    // compare string versions
    return representationsStrings.has(JSON.stringify(polygon));
  }


  /**
   * Determines whether invoking Polygon overlaps the passed Polygon
   * @param polygon - the Polygon to compare against
   * @returns whether the Polygons overlap
   */
  public overlaps(polygon: Polygon): boolean {
    if (this.equals(polygon)) return true;
    const linesA: Array<Line> = this.lines();
    const linesB: Array<Line> = polygon.lines();
    for (const lineA of linesA) {
      for (const lineB of linesB) {
        if (lineA.crossesOver(lineB)) return true;
      }
    }
    return false;
  }


  /**
   * Creates a Polygon from a JSON object. The JSON must match the Polygon
   * schema for the method to succeed.
   * @param polygonJSON - the polygon formatted JSON
   * @returns the Polygon represented by the JSON
   */
  public static fromJSON(polygonJSON: PolygonJSON): Polygon {
    const ajv = new Ajv();
    if (!ajv.validate(polygonSchema, polygonJSON)) throw new TypeError();
    const { points: pointsJSON } = polygonJSON.data;
    const points = pointsJSON.map((pointJSON) => Point.fromJSON(pointJSON));
    return new Polygon({ points });
  }


  /**
   * Creates a JSON object from invoking Polygon.
   * @returns the JSON representation of the Polygon
   */
  public toJSON(): PolygonJSON {
    const { _points } = this;
    return {
      className: "Polygon",
      data: {
        points: _points.map(point => point.toJSON()),
      },
    };
  }
};