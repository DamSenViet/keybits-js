import { Decimal } from "decimal.js";
Decimal.set({ precision: 64, rounding: 1 });

export interface PointOptions {
  x: Decimal,
  y: Decimal,
}

export interface PointJSON {
  x: string,
  y: string,
}

class Point {
  protected _x: Decimal = new Decimal("0");
  protected _y: Decimal = new Decimal("0");

  public constructor(options: Point | PointOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    const { x, y } = options;
    // toString allows compatibility with other math libraries
    if (x != null) this.x = new Decimal(x);
    if (y != null) this.y = new Decimal(y);
  }

  // property getter/setters
  public get x(): Decimal {
    const { _x } = this;
    return _x;
  }

  public set x(x: Decimal) {
    if (!(x instanceof Decimal)) throw new TypeError();
    this._x = x;
  }

  public get y(): Decimal {
    const { _y } = this;
    return _y;
  }

  public set y(y: Decimal) {
    if (!(y instanceof Decimal)) throw new TypeError();
    this._y = y;
  }

  // methods
  public equals(point: Point): boolean {
    const { x, y } = this;
    return x.equals(point.x) && y.equals(point.y);
  }

  public fromJSON(json: PointJSON) {
  }

  public toJSON(): PointJSON {
    const { x, y } = this;
    // maintain precision with strings
    return {
      x: x.toString(),
      y: y.toString(),
    };
  }
}


export default Point;