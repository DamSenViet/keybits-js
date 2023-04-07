import Ajv from "ajv";
import { Label } from "./Label";
import keySchema from "./Key.schema";
import { isObject, isArray, isString } from "lodash";

export interface MatrixPosition {
  row: number,
  column: number,
};

export interface KeyOptions {
  path: string,
  matrixPosition: MatrixPosition,
  color: string,
  labels: Label[],
};

export interface KeyJSON {
  className: "Key",
  data: {
    path: string,
    stabilized: boolean,
    stabilizerPath: string,
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
   * The shape of the key.
   * Uses key units.
   */
  protected _path: string = "";

  /**
   * The switch plate cutout 0.
   * Uses real units.
   * Set at export time.
   */
  protected _switchPath: string = "";

  /**
   * Minimum spacing required around this switch.
   * Uses real units.
   * Set at export time.
   */
  protected _switchSpacing: number = 0;

  /**
   * The id of the footprint associated with the switch.
   * Set at export time.
   */
  protected _switchFootprintId: string = "";

  /**
   * Whether or not the key is stabilized.
   * Any key 2u or more should be stabilized.
   */
  protected _stabilized: boolean = false;

  /**
   * The stabilizer plate cutout.
   * Uses real units.
   * Set at export time.
   */
  protected _stabilizerPath: string = "";

  /**
   * The id of the footprint associated with the stabilizer.
   * Set at export time.
   */
  protected _stabilizerFootprintId: string = "";

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