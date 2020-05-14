import Line from "./Line";

class StrictLine extends Line {

  validate() {
    const { start, end } = this;
    start.validate();
    end.validate();
  }
}

export default StrictLine;