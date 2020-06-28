import { PointOptions, PointJSON } from "./Point";
import Point from "./Point";

export interface PolygonOptions {
  points: Array<PointOptions>
}

export interface PolygonJSON {
  points: Array<PointJSON>
}

export default class Polygon {
  protected _points: Array<Point>;
  constructor(options: Polygon | PolygonOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    const { points } = options;
    if (points != null) this.points = (<Array<Point | PointOptions>>points)
      .map(point => new Point(point));
  }

  public get points(): Array<Point> {
    return this._points;
  }

  public set points(points: Array<Point>) {
    if (!(points instanceof Array)) throw new TypeError();
    for (const point of points) {
      if (!(point instanceof Point)) throw new TypeError();
    }
    // perform validation on points
    this._points = points;
  }

  public equals(polygon: Polygon): boolean {
    return false;
  }

  public fromJSON(json: PolygonJSON) {
  }

  public toJSON(): PolygonJSON {
    return null;
  }
}