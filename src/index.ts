// import Keyboard from  "~/Keyboard";
// import Point from "~/Point";
// import utils from "~/utils";
import * as Geometry from "./Geometry";
import Point from "./Geometry/Point";
import StrictPoint from "./Geometry/StrictPoint";
import Line from "./Geometry/Line";
import StrictLine from "./Geometry/StrictLine";
import StrictPolygon from "./Geometry/StrictPolygon";

// if (
//   typeof window !== 'undefined' &&
//   {}.toString.call(window) === '[object Window]'
// ) {
//   window.keylabs = {
//     Geometry,
//   };
// };

export default {
  Geometry,
  Point,
  StrictPoint,
  Line,
  StrictLine,
  StrictPolygon
}
export {
  Geometry,
  Point,
  StrictPoint,
  Line,
  StrictLine,
  StrictPolygon
};