// imports
import { PointOptions, PointJSON } from "./Point";
import StrictPoint from "./StrictPoint";
import StrictLine from "./Line";

export interface PolygonOptions {
  points: [PointOptions]
}

export interface PolygonJSON {
  points: [PointJSON]
}

// cyclical, clockwise (to determine convex/concave)
// composed of all right angles
class StrictPolygon {
}

export default StrictPolygon;