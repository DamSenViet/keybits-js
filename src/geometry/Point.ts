import Validatable from "../Validatable";
import { Decimal } from "decimal.js";

Decimal.set({ precision: 64, rounding: 1});

export type PointString = [string, string];
export type PointNumber = [number, number];
export type PointDecimal = [Decimal, Decimal];
export type PointAll = PointString | PointNumber | PointDecimal;
export type PointJSON = PointString;

class Point extends Validatable {
  public x: Decimal = new Decimal("0");
  public y: Decimal = new Decimal("0");

  public constructor([x, y]: PointAll = undefined) {
    super();
    if (arguments.length <= 0) return;
    this.x = new Decimal(x);
    this.y = new Decimal(y);
  }

  public copy(): Point {
    return this.constructor(this.toJSON());
  }

  public equals(point): boolean {
    const { x, y } = this;
    return x.equals(point.x) && y.equals(point.y);
  }

  public toJSON(): PointJSON {
    const { x, y } = this;
    // maintain precision
    return [x.toString(), y.toString()];
  }

  public move([x, y]: PointAll): void {
    this.x = new Decimal(x);
    this.y = new Decimal(y);
  }

  public shift([x, y]: PointAll): void {
    this.x = this.x.add(x);
    this.y = this.y.add(y);
  }
}


export default Point;