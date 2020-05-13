import Validatable from "~/Validatable";
import {
  bignumber,
  equal,
  add
} from "mathjs";

class Point extends Validatable {
  constructor([x, y]) {
    super();
    if (arguments.length <= 0) return;
    this.x = bignumber(x);
    this.y = bignumber(y);
  }

  copy() {
    return new Point(this.toJSON());
  }

  equals(point) {
    const { x, y } = this;
    return equal(x, point.x) && equal(y, point.y);
  }

  toJSON() {
    const { x, y } = this;
    // maintain precision
    return [x.toString(), y.toString()];
  }

  move([x, y]) {
    this.x = bignumber(x);
    this.y = bignumber(y);
  }

  shift([x, y]) {
    this.x = add(this.x, x);
    this.y = add(this.y, y);
  }
}


export default Point;