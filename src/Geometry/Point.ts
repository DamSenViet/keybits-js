import Validatable from "../Validatable";
import {
  bignumber,
  equal,
  add,
} from "mathjs";

export type PointString = [string, string];
export type PointNumber = [number, number];
export type PointAll = PointString | PointNumber;
export type PointJSON = PointString;

class Point extends Validatable {
  public x: any = bignumber("0");
  public y: any = bignumber("0");

  constructor([x, y]: any) {
    super();
    if (arguments.length <= 0) return;
    this.x = bignumber(x);
    this.y = bignumber(y);
  }

  copy(): Point {
    return this.constructor(this.toJSON());
  }

  equals(point) {
    const { x, y } = this;
    return equal(x, point.x) && equal(y, point.y);
  }

  toJSON() {
    const { x, y } = this;
    // maintain precision
    return [x.toString(), y.toString()];
  }

  move([x, y]) {
    this.x = bignumber(x);
    this.y = bignumber(y);
  }

  shift([x, y]) {
    this.x = add(this.x, x);
    this.y = add(this.y, y);
  }
}


export default Point;