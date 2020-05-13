import Line from "~/Geometry/Line";

class StrictLine extends Line {
  constructor(...params) {
   super(...params);
  }

  validate() {
    const { start, end } = this;
    start.validate();
    end.validate();
  }
}

export default StrictLine;