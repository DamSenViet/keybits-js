import { MissingConstructorError } from "~/Errors";

class Point {
  constructor([x, y]) {
    this.x = x;
    this.y = y;
  }

  copy() {
    const { x, y } = this;
    return new Point([x, y]);
  }

  equals(point) {
    const { x, y } = this;
    x === point.x;
    y === point.y;
  }

  toJSON() {
    const { x, y } = this;
    return [x, y];
  }


  validate() { return true; }
}


export default Point;