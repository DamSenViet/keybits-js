import { MissingConstructorError } from "~/Errors";

class Point {

  x = 0.0;
  y = 0.0;

  constructor(...args) {
    let x, y;
    if (args.length === 0) return;
    if (args.length === 1) {
      // from String
      if (typeof args[0] === "string") {
        [x, y] = JSON.parse(args[0]);
      }
      // from Array
      else if (args[0] instanceof Array) {
        [x, y] = args[0];
      }
      // from Object
      else if (args[0] instanceof Object) {
        ({ x, y } = args[0]);
      }
      else throw new MissingConstructorError();
    }
    // from x, y
    else if (args.length === 2) {
      [x, y] = args;
    }
    else throw new MissingConstructorError();

    if (typeof x !== "number" || typeof y !== "number") {
      throw new TypeError();
    }

    this.x = x;
    this.y = y;
  }

  toJSON = () => {
    return [x, y];
  }

  toString = () => {
    return `Point: ${{ x, y }}`;
  }

  validate = () => { return true; }
}

export default Point;