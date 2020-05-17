import Line from "./Line";

class StrictLine extends Line {

  public validate(): void {
    const { start, end } = this;
    start.validate();
    end.validate();
  }
}

export default StrictLine;