import Ajv from "ajv";
import { Label } from "./Label";
import keySchema from "./Key.schema";
import { isObject } from "lodash";
import { CapName } from "./utils/caps";

export interface MatrixPosition {
  row: number,
  column: number,
};

export interface Cap {
  /**
   * The svg path data of the cap shape.
   * Path data units are key units.
   */
  shape: string,
  /**
   * The cap name of the cap type.
   * Also determines the switch type.
   */
  type: CapName,
  /**
   * The css 6 digit hex color of the cap.
   */
  color: string,
  /**
   * The labels on the cap.
   */
  labels: Label[],
};

export interface Transform {
  originX: number,
  originY: number,
  rotate: number;
  translateX: number,
  translateY: number,
};

export interface KeyOptions {
  matrixPosition: MatrixPosition,
  transform: Transform,
  cap: Cap,
};

export interface KeyJSON {
  className: "Key",
  data: {
    matrixPosition: MatrixPosition,
    transform: Transform,
    cap: Cap,
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
   * The physical transofmration of the key.
   */
  public transform: Transform = {
    originX: 0,
    originY: 0,
    rotate: 0,
    translateX: 0,
    translateY: 0,
  }

  /**
   * Grouped cap related properties of the Key.
   */
  public cap: Cap = {
    type: CapName.cherry,
    shape: "",
    color: "#FFFFFF",
    labels: [],
  };

  /**
   * Instantiates a Key.
   * @param options A configuration Object.
   */
  public constructor(options?: Key | Partial<KeyOptions>) {
    if (arguments.length <= 0) return;
    if (!isObject(options)) throw new TypeError();
    let matrixPosition: MatrixPosition;
    let cap: Cap;
    let transform: Transform;
    if (options instanceof Key)
      ({
        matrixPosition,
        transform,
        cap,
      } = options as Key)
    else
      ({
        matrixPosition,
        transform,
        cap,
      } = options as KeyOptions)
    if (!isObject(cap)) throw new TypeError();
    this.matrixPosition = matrixPosition;
    this.transform = transform;
    this.cap = cap;
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
      transform,
      cap,
    } = keyJSON.data;
    return new Key({
      matrixPosition,
      transform,
      cap,
    });
  }


  /**
   * Creates a JSON object from invoking Key.
   * @returns The JSON representation of the Key.
   */
  toJSON(): KeyJSON {
    const {
      matrixPosition,
      transform,
      cap,
    } = this;
    return {
      className: "Key",
      data: {
        matrixPosition,
        transform,
        cap,
      }
    }
  }
};

export default Key;