import Validatable from "~/Validatable";
import Point from "~/Geometry/Point";
import { intersect } from "mathjs";

class Line extends Validatable {
  constructor([start, end]) {
    super();
    if (arguments.length <= 0) return;
    this.start = new Point(start);
    this.end = new Point(end);
  }

  copy() {
    return new Line(this.toJSON());
  }

  toJSON() {
    const { start, end } = this;
    return [start.toJSON(), end.toJSON()];
  }

  intersection(line) {
    const { start, end } = this;
    return intersect(start.toJSON(), end.toJSON(),
      line.start.toJSON(), line.end.toJSON());
  }

  intersects(line) {
    return Boolean(this.intersection(line));
  }
}

export default Line;