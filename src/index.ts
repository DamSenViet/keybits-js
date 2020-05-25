// import Keyboard from  "~/Keyboard";
// import Point from "~/Point";
// import utils from "~/utils";
import * as geometry from "./geometry";
import Point from "./geometry/Point";
import StrictPoint from "./geometry/StrictPoint";
import Line from "./geometry/Line";
import StrictLine from "./geometry/StrictLine";
import StrictPolygon from "./geometry/StrictPolygon";
import Profiles from "./Profiles";

// if (
//   typeof window !== 'undefined' &&
//   {}.toString.call(window) === '[object Window]'
// ) {
//   window.keylabs = {
//     Geometry,
//   };
// };

export default {
  geometry,
  Point,
  StrictPoint,
  Line,
  StrictLine,
  StrictPolygon,
  Profiles
}
export {
  geometry,
  Point,
  StrictPoint,
  Line,
  StrictLine,
  StrictPolygon,
  Profiles
};