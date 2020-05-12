import Point from "~/Geometry/Point";
import { intersect } from "mathjs";

class Line {

  constructor([start, end]) {
    this.start = new Point(start);
    this.end = new Point(end);
  }

  toJSON = () => {
    const { start, end } = this;
    return [start.toJSON(), end.toJSON()];
  }

  intersection(line) {
    const { start, end } = this;
    return intersect(start.toJSON(), end.toJSON(),
    line.start.toJSON(), line.end.toJSON());
  }

  intersects(line) {
    return Boolean(this.intersection(line).length);
  }
}

export default Line;