import { Label } from "./Label";
import { isObject, isArray, isString } from "lodash";

export interface MatrixOptions {
  row: number,
  column: number,
};

export interface KeyOptions {
  path: string,
  matrixPosition: MatrixOptions,
  color: string,
  labels: Label[],
};

export interface KeyJSON {
  className: "Key",
  data: {
    path: string,
    matrixPosition: MatrixOptions,
    color: string,
    labels: unknown[],
  },
}

class Key {
  // the shape of the key represented as an svg path string
  protected _path: string = "";

  // electrical data
  protected _matrixPosition = {
    row: 0,
    column: 0,
  };

  protected _color = "#FFFFFF";
  protected _labels: Array<Label> = new Array();

  /**
   * Instantiates a Key.
   * @param options - a configuration Object.
   */
  public constructor(options?: Key | KeyOptions) {
    if (arguments.length <= 0) return;
    if (!isObject(options)) throw new TypeError();
    let path; // generate default path
    let color: string;
    let labels: Label[];
    if (options instanceof Key)
      ({
        _path: path,
        _color: color,
        _labels: labels
      } = options as Key)
    else
      ({
        path,
        color,
        labels,
      } = options as KeyOptions)
    if (!isString(path)) throw new TypeError();
    this._path = path;
    if (!isString(color)) throw new TypeError();
    this._color = color;
    if (!isArray(labels)) throw new TypeError();
    this._labels = labels;
  }
};

export default Key;