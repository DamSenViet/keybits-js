import Ajv from "ajv";
import { Label } from "./Label";
import keySchema from "./Key.schema";
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
    stabilized: boolean,
    stabilizerPath: string,
    matrixPosition: MatrixOptions,
    color: string,
    labels: unknown[],
  },
}

class Key {
  // the shape of the key represented as an svg path string
  protected _path: string = "";

  protected _stabilized: boolean = false;

  protected _stabilizerPath: string = "";

  // electrical data
  protected _matrixPosition = {
    row: 0,
    column: 0,
  };

  protected _color = "#FFFFFF";
  protected _labels: Array<Label> = new Array();

  /**
   * Instantiates a Key.
   * @param options A configuration Object.
   */
  public constructor(options?: Key | Partial<KeyOptions>) {
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


  /**
   * Creates a Point from a JSON object.
   * @param pointJSON The Key formatted JSON.
   * @returns The Key represented by the JSON.
   */
  public static fromJSON(keyJSON: KeyJSON): Key {
    const ajv = new Ajv();
    if (!ajv.validate(keySchema, keyJSON)) throw new TypeError();
    const {
      path,
      color,
      matrixPosition,
      labels: labelsJSON,
    } = keyJSON.data;
    // need to implement labels fromJSON
    const labels: Label[] = [];
    return new Key({
      path,
      color,
      matrixPosition,
    });
  }


  /**
   * Creates a JSON object from invoking Key.
   * @returns The JSON representation of the Key.
   */
  toJSON(): KeyJSON {
    const {
      _path,
      _stabilized,
      _stabilizerPath,
      _color,
      _matrixPosition,
      _labels,
    } = this;
    return {
      className: "Key",
      data: {
        path: _path,
        stabilized: _stabilized,
        stabilizerPath: _stabilizerPath,
        color: _color,
        matrixPosition: _matrixPosition,
        labels: _labels,
      }
    }
  }
};

export default Key;