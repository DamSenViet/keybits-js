import { Label } from "./Label";

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
  protected path: string = "";

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
    if (typeof options !== "object") throw new TypeError();
  }
};

export default Key;