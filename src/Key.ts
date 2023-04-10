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
  capColor: string,
  capLabels: Label[],
};

export interface KeyJSON {
  className: "Key",
  data: {
    matrixPosition: MatrixPosition,
    capColor: string,
    capLabels: unknown[],
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
  protected _capColor = "#FFFFFF";

  /**
   * The labels on the cap.
   */
  protected _capLabels: Array<Label> = new Array();

  /**
   * Instantiates a Key.
   * @param options A configuration Object.
   */
  public constructor(options?: Key | Partial<KeyOptions>) {
    if (arguments.length <= 0) return;
    if (!isObject(options)) throw new TypeError();
    let matrixPosition: MatrixPosition;
    let capPath: string;
    let capColor: string;
    let capLabels: Label[];
    if (options instanceof Key)
      ({
        _matrixPosition: matrixPosition,
        _capColor: capColor,
        _capLabels: capLabels,
      } = options as Key)
    else
      ({
        matrixPosition,
        capColor: capColor,
        capLabels: capLabels,
      } = options as KeyOptions)
    if (!isString(capColor)) throw new TypeError();
    this._capColor = capColor;
    if (!isArray(capLabels)) throw new TypeError();
    this._capLabels = capLabels;
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
      matrixPosition,
      capColor: capColor,
      capLabels: labelsJSON,
    } = keyJSON.data;
    // need to implement labels fromJSON
    const labels: Label[] = [];
    return new Key({
      matrixPosition,
      capColor: capColor,
    });
  }


  /**
   * Creates a JSON object from invoking Key.
   * @returns The JSON representation of the Key.
   */
  toJSON(): KeyJSON {
    const {
      _matrixPosition,
      _capColor,
      _capLabels,
    } = this;
    return {
      className: "Key",
      data: {
        matrixPosition: _matrixPosition,
        capColor: _capColor,
        capLabels: _capLabels,
      }
    }
  }
};

export default Key;