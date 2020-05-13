import Point from "~/Geometry/Point";
import {
  equal,
  mod
} from "mathjs";

class StrictPoint extends Point {
  constructor(...params) {
    super(...params);
  }

  validate() {
    const { x, y } = this;
    for (let val of [x, y]) {
      if (!equal(mod(val, 0.25), 0)) throw RangeError();
    }
  }
}


export default StrictPoint;