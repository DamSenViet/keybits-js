import Validatable from "~/Validatable";

class Point extends Validatable {
  constructor([x, y]) {
    super();
    if (arguments.length <= 0) return;
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Point(this.toJSON());
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
}


export default Point;