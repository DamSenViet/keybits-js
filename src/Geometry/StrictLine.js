import Line from "~/Geometry/Line";

class StrictLine extends Line {
  constructor(...params) {
   super(...params);
  }

  validate() {
    const { start, end } = this;
    for (let point of [start, end]) {
      point.validate();
    }
  }
}

export default StrictLine;