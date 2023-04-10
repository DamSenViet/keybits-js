import Ajv from "ajv";
import { Label } from "./Label";
import keySchema from "./Key.schema";
import { isObject, isArray, isString } from "lodash";

export interface MatrixPosition {
  row: number,
  column: number,
};

export interface KeyOptions {
  matrixPosition: MatrixPosition,
  color: string,
  labels: Label[],
};

export interface KeyJSON {
  className: "Key",
  data: {
    matrixPosition: MatrixPosition,
    color: string,
    labels: unknown[],
  },
}

/**
 * A Key representing the cap, switch, associated stabilizers and styles.
 */
class Key {
  /**
   * The associated matrix position of the key.
   */
  protected _matrixPosition: MatrixPosition = {
    row: 0,
    column: 0,
  };

  /**
   * The color of the cap.
   */
  protected _color = "#FFFFFF";

  /**
   * The labels on the cap.
   */
  protected _labels: Array<Label> = new Array();

  /**
   * Instantiates a Key.
   * @param options A configuration Object.
   */
  public constructor(options?: Key | Partial<KeyOptions>) {
    if (arguments.length <= 0) return;
    if (!isObject(options)) throw new TypeError();
    let capPath: string;
    let color: string;
    let labels: Label[];
    let matrixPosition: MatrixPosition;
    if (options instanceof Key)
      ({
        _matrixPosition: matrixPosition,
        _color: color,
        _labels: labels,
      } = options as Key)
    else
      ({
        matrixPosition,
        color,
        labels,
      } = options as KeyOptions)
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
      color,
      matrixPosition,
      labels: labelsJSON,
    } = keyJSON.data;
    // need to implement labels fromJSON
    const labels: Label[] = [];
    return new Key({
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
      _matrixPosition,
      _color,
      _labels,
    } = this;
    return {
      className: "Key",
      data: {
        matrixPosition: _matrixPosition,
        color: _color,
        labels: _labels,
      }
    }
  }
};

export default Key;