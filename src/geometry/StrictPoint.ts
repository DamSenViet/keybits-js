import Point from "./Point";

class StrictPoint extends Point {

  public validate(): void {
    const { x, y } = this;
    for (let val of [x, y]) {
      if (!val.mod(0.25).isZero()) throw RangeError();
    }
  }
}


export default StrictPoint;