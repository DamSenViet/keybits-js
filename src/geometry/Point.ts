import Ajv from "ajv";
import pointSchema from "./Point.schema";
import Decimal from "decimal.js";

export interface PointOptions {
  x?: Decimal,
  y?: Decimal,
};

export interface PointJSON {
  x: string,
  y: string,
};

export default class Point {
  protected _x: Decimal = new Decimal(0);
  protected _y: Decimal = new Decimal(0);

  public constructor(options?: Point | PointOptions) {
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

  public fromJSON(pointJSON: PointJSON): Point {
    // verify with ajv
    const ajv = new Ajv();
    if (!ajv.validate(pointSchema, pointJSON)) throw new TypeError();
    const { x: xJSON, y: yJSON } = pointJSON;
    this.x = new Decimal(xJSON);
    this.y = new Decimal(yJSON);
    return this;
  }

  public static fromJSON(pointJSON: PointJSON): Point {
    return new Point().fromJSON(pointJSON);
  }

  public toJSON(): PointJSON {
    const { x, y } = this;
    // maintain precision with strings
    return {
      x: x.toString(),
      y: y.toString(),
    };
  }

  public static toJSON(point: Point): PointJSON {
    return point.toJSON();
  }
};