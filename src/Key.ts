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
  capShape: string,
  capColor: string,
  capLabels: Label[],
};

export interface KeyJSON {
  className: "Key",
  data: {
    matrixPosition: MatrixPosition,
    capShape: string,
    capColor: string,
    capLabels: unknown[],
  },
}

/**
 * A Key representing the cap, switch, associated stabilizers and styles.
 */
class Key {
  /**
   * The name/alias of the Key.
   */
  public name: string = "";
  
  /**
   * The associated matrix position of the key.
   */
  public matrixPosition: MatrixPosition = {
    row: 0,
    column: 0,
  };

  /**
   * The svg path data of the cap shape.
   * Path data units are key units.
   */
  public capShape: string = "";

  /**
   * The color of the cap.
   */
  public capColor = "#FFFFFF";

  /**
   * The labels on the cap.
   */
  public capLabels: Array<Label> = new Array();

  /**
   * Instantiates a Key.
   * @param options A configuration Object.
   */
  public constructor(options?: Key | Partial<KeyOptions>) {
    if (arguments.length <= 0) return;
    if (!isObject(options)) throw new TypeError();
    let matrixPosition: MatrixPosition;
    let capShape: string;
    let capColor: string;
    let capLabels: Label[];
    if (options instanceof Key)
      ({
        matrixPosition,
        capShape,
        capColor,
        capLabels,
      } = options as Key)
    else
      ({
        matrixPosition,
        capShape,
        capColor,
        capLabels,
      } = options as KeyOptions)
    if (!isString(capShape)) throw new TypeError();
    this.capShape = capColor;
    if (!isString(capColor)) throw new TypeError();
    this.capColor = capColor;
    if (!isArray(capLabels)) throw new TypeError();
    this.capLabels = capLabels;
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
      capColor,
      capLabels: labelsJSON,
    } = keyJSON.data;
    // need to implement labels fromJSON
    const labels: Label[] = [];
    return new Key({
      matrixPosition,
      capColor,
    });
  }


  /**
   * Creates a JSON object from invoking Key.
   * @returns The JSON representation of the Key.
   */
  toJSON(): KeyJSON {
    const {
      matrixPosition,
      capShape,
      capColor,
      capLabels,
    } = this;
    return {
      className: "Key",
      data: {
        matrixPosition,
        capShape,
        capColor,
        capLabels,
      }
    }
  }
};

export default Key;