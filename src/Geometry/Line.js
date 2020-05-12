import Point from "~/Geometry/Point";

class Line {

  constructor([start, end]) {
    this.start = new Point(start);
    this.end = new Point(end);
  }


  toJSON = () => {
    return [this.start.toJSON(), this.end.toJSON()];
  }


  // returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
  static intersects(la, lb) {

    let [a, b] = [la.start.x, la.start.y];
    let [c, d] = [la.end.x, la.end.y];
    let [p, q] = [lb.start.x, lb.end.y];
    let [r, s] = [lb.end.x, lb.end.y];
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    }
    else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }
}

export default Line;