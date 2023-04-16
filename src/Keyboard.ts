import { KeyItem } from "./KeyItems";


interface KeyboardOptions {
}

interface KeyboardJSON {
}

/**
 * A keyboard representing the physical layout of the PCB.
 */
class Keyboard {
  /**
   * The name of the physical layout.
   */
  public name: string = "";

  /**
   * The maintainer's name or alias.
   */
  public maintainer: string = "";

  /**
   * A URL to the maintainer's profile.
   */
  public maintainerUrl: string = "";

  /**
   * The PCB matrix. Keys will be assigned matrix positions.
   */
  public matrix = {
    rows: 0,
    columns: 0,
  };

  /**
   * Stores keycodes for each matrix position.
   * We don't store keycodes in the key since the keycodes are owned by the
   * matrix position. Multiple keys can map onto the same matrix position and
   * all those keys must source the keycodes from the same matrix position.
   */
  private keycodesIndex: string[][][] = [];

  /**
   * The list of keys, rotaries, and clusters.
   */
  public keyItems: Array<KeyItem> = [];

  /**
   * Instantiates a Keyboard.
   * @param options A configuration Object.
   */
  public constructor(options?: Keyboard | Partial<KeyboardOptions>) {
  }

  /**
   * Creates a Keyboard from a JSON object. The JSON must match Keyboard schema
   * for the method to succeed.
   * @param keyboardJSON The Keyboard formatted JSON.
   * @returns The Point represented by the JSON.
   */
  public static fromJSON(keyboardJSON: KeyboardJSON) {
    return new Keyboard();
  }

  /**
   * Creates a JSON object from the invoking Keyboard.
   * @returns The JSON representation of the Point.
   */
  public toJSON(): KeyboardJSON {
    return {
    };
  }
}

export default Keyboard;