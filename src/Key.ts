import { Point, Polygon } from "./geometry";
import Decimal from "decimal.js";

class Key {
  public _isConvex: boolean = false;
  public _width: Decimal = new Decimal(1.0);
  public _height: Decimal = new Decimal(1.0);

  // shape for profile + row
  public _shape: Polygon = new Polygon();

  // electrical data
  public _matrixPosition = {
    row: 0,
    column: 0,
  };

  protected _stepped: Polygon = new Polygon();

  protected _color = "#FFFFFF";
  protected _labels = new Array();
  protected _tags: Set<string> = new Set<string>();

  // only showed when active
  // displayed with lower opacity
  protected _freeActiveTransform = "";
  protected _freeInactiveTransform = "";
  // for QMK / VIA compatibility
  protected _orthogonalActiveTransform = "";
  protected _orthogonalInactiveTransform = "";

  public constructor() {

  }
};

export default Key;