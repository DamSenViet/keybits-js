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

/**
 * Immutable Point
 */
export default class Point {
  protected _x: Decimal = new Decimal(0);
  protected _y: Decimal = new Decimal(0);

  public constructor(options?: Point | PointOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    const { x, y } = options;
    // toString allows compatibility with other math libraries
    if (x != null) {
      if (!(x instanceof Decimal)) throw new TypeError();
      this._x = new Decimal(x);
    }
    if (y != null) {
      if (!(y instanceof Decimal)) throw new TypeError();
      this._y = new Decimal(y);
    }
    Object.freeze(this);
  }

  // property
  public get x(): Decimal {
    const { _x } = this;
    return _x;
  }

  public get y(): Decimal {
    const { _y } = this;
    return _y;
  }

  // methods
  public equals(point: Point): boolean {
    const { x, y } = this;
    return x.equals(point.x) && y.equals(point.y);
  }

  public static fromJSON(pointJSON: PointJSON): Point {
    const ajv = new Ajv();
    if (!ajv.validate(pointSchema, pointJSON)) throw new TypeError();
    const { x: xJSON, y: yJSON } = pointJSON;
    const x = new Decimal(xJSON);
    const y = new Decimal(yJSON);
    return new Point({ x, y });
  }

  public toJSON(): PointJSON {
    const { x, y } = this;
    // maintain precision with strings
    return {
      x: x.toString(),
      y: y.toString(),
    };
  }
};