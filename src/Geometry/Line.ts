import Validatable from "../Validatable";
import Point from "./Point";
import { intersect } from "mathjs";
// types
import { PointString, PointNumber, PointAll, PointJSON } from "./Point";

export type StringLine = [PointString, PointString];
export type LineNumber = [PointNumber, PointNumber];
export type LineAll = [PointAll, PointAll];
export type LineJSON = [PointJSON, PointJSON];

class Line extends Validatable {
  public start: any;
  public end: any;

  constructor([start, end]: any) {
    super();
    if (arguments.length <= 0) return;
    this.start = new Point(start);
    this.end = new Point(end);
  }

  copy() {
    return new Line(this.toJSON());
  }

  equals(line) {
    const { start, end } = this;
    return (
      (start.equals(line.start) && end.equals(line.end())) ||
      (start.equals(line.end) && end.equals(line.start))
    );
  }

  toJSON() {
    const { start, end } = this;
    return [start.toJSON(), end.toJSON()];
  }

  intersection(line) {
    const { start, end } = this;
    return intersect(
      [start.x, start.y],
      [end.x, end.y],
      [line.start.x, line.start.y],
      [line.end.x, line.end.y]
    );
  }

  intersects(line) {
    return Boolean(this.intersection(line));
  }
}

export default Line;