import * as geometry from "./geometry";
import Point from "./geometry/Point";
import StrictPoint from "./geometry/StrictPoint";
import Line from "./geometry/Line";
import StrictLine from "./geometry/StrictLine";
import StrictPolygon from "./geometry/StrictPolygon";
import Profiles from "./Profiles";

import Decimal from "decimal.js";
Decimal.set({ precision: 64, rounding: 1 });

export default {
  geometry,
  Point,
  StrictPoint,
  Line,
  StrictLine,
  StrictPolygon,
  Profiles,
}
export {
  geometry,
  Point,
  StrictPoint,
  Line,
  StrictLine,
  StrictPolygon,
  Profiles,
};