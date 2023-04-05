import Ajv from "ajv";
import polygonSchema from "./Polygon.schema";
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
    new Point({ x: 0, y: 0 }),
    new Point({ x: 0, y: 1 }),
    new Point({ x: 1, y: 1 }),
    new Point({ x: 1, y: 0 }),
  );


  /**
   * Instantiates a Polygon.
   * @param options A configuration Object with 'points' as an Array of Points.
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
   * Gets a copy of the ordered Points that make up the Polygon.
   */
  public getPoints(): Array<Point> {
    return this._points.slice();
  }


  /**
   * Computes the lines from the Points of the Polygon.
   */
  public getLines(): Array<Line> {
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
   * Computes the bounding width of the Polygon.
   */
  public getBoundingWidth(): number {
    const { _points } = this;
    let lowest: number = Infinity;
    let highest: number = -Infinity;
    for (const point of _points) {
      if (point.getX() < lowest) lowest = point.getX();
      if (point.getX() > highest) highest = point.getX();
    }
    return Math.abs(highest - lowest);
  }


  /**
   * Computes the bounding height of the Polygon.
   */
  public getBoundingHeight(): number {
    const { _points } = this;
    let lowest: number = Infinity;
    let highest: number = -Infinity;
    for (const point of _points) {
      if (point.getY() < lowest) lowest = point.getY();
      if (point.getY() > highest) highest = point.getY();
    }
    return Math.abs(highest - lowest);
  }


  /**
   * Computes all equivalent Polygon representations of the Polygon.
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
   * @param polygon The Polygon to compare against.
   * @returns Whether the Polygons are equal representations.
   */
  public equals(polygon: Polygon): boolean {
    const representationsStrings: Set<string> = new Set(this.getRepresentations()
      .map(polygon => JSON.stringify(polygon)));
    // compare string versions
    return representationsStrings.has(JSON.stringify(polygon));
  }


  /**
   * Determines whether invoking Polygon overlaps the passed Polygon
   * @param polygon The Polygon to compare against.
   * @returns Whether the Polygons overlap.
   */
  public overlaps(polygon: Polygon): boolean {
    if (this.equals(polygon)) return true;
    const linesA: Array<Line> = this.getLines();
    const linesB: Array<Line> = polygon.getLines();
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
   * @param polygonJSON The polygon formatted JSON.
   * @returns The Polygon represented by the JSON.
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
   * @returns The JSON representation of the Polygon.
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