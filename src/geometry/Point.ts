import Validatable from "../Validatable";
import {
  config,
  bignumber,
  equal,
  add,
} from "mathjs";

// explicit config, defaults from mathjs
config({
  number: 'BigNumber',
  precision: 64
});

export type PointString = [string, string];
export type PointNumber = [number, number];
export type PointAll = PointString | PointNumber;
export type PointJSON = PointString;

class Point extends Validatable {
  public x: any = bignumber("0");
  public y: any = bignumber("0");

  public constructor([x, y]: any = undefined) {
    super();
    if (arguments.length <= 0) return;
    this.x = bignumber(x);
    this.y = bignumber(y);
  }

  public copy(): Point {
    return this.constructor(this.toJSON());
  }

  public equals(point) {
    const { x, y } = this;
    return equal(x, point.x) && equal(y, point.y);
  }

  public toJSON() {
    const { x, y } = this;
    // maintain precision
    return [x.toString(), y.toString()];
  }

  public move([x, y]) {
    this.x = bignumber(x);
    this.y = bignumber(y);
  }

  public shift([x, y]) {
    this.x = add(this.x, x);
    this.y = add(this.y, y);
  }
}


export default Point;