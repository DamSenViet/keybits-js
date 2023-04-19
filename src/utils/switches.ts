/**
 * @file Information on various switch types to aid drawing generation.
 */

import {
  values,
} from "lodash";

/**
 * Valid switch names.
 */
export enum SwitchName {
  mx = "Cherry MX",
  alps = "Alps SKCM/SKCL",
  chocV1 = "Kailh Low Profile Choc V1",
  chocV2 = "Kailh Low Profile Choc V2",
}

/**
 * Switch data expressed as an object.
 */
export interface SwitchType {
  /**
   * The name of the switch type.
   */
  name: SwitchName,
  /**
   * The svg path data for the plate cutout. Specified in millimeters.
   */
  switchPlateCutout: string,
  /**
   * The margin reserved around the keycap. Specified in millimeters.
   * Definitions must be ((keycap width - tolerance) - switch cutout bounding width) / 2.
   */
  marginX: number,
  /**
   * The margin reserved around the keycap. Specified in millimeters.
   * Definitions must be ((keycap height - tolerance) - switch cutout bounding height) / 2.
   */
  marginY: number,
};


// https://matt3o.com/anatomy-of-a-keyboard/
export const mx: SwitchType = {
  name: SwitchName.mx,
  switchPlateCutout: "TODO",
  marginX: ((18.00 + 1.05) - 14.00) / 2,
  marginY: ((18.00 + 1.05) - 14.00) / 2,
};

// export const alps: SwitchType = {
//   name: SwitchName.alps,
//   switchPlateCutout: "TODO",
//   marginX: 0,
//   marginY: 0,
// };

// export const chocV1: SwitchType = {
//   name: SwitchName.chocV1,
//   switchPlateCutout: "TODO",
//   marginX: 0,
//   marginY: 0,
// };

// export const chocV2: SwitchType = {
//   name: SwitchName.chocV2,
//   switchPlateCutout: "TODO",
//   marginX: 0,
//   marginY: 0,
// };

/**
 * List of all valid switch names.
 */
export const switchNames: SwitchName[] = values(SwitchName);

/**
 * List of all valid cap names.
 */
export const switchTypes: SwitchType[] = [
  mx,
  // alps,
  // chocV1,
  // chocV2,
];

/**
 * Mapping for SwitchName to SwitchType.
 */
export const switchNameToSwitchType: Map<SwitchName, SwitchType> = new Map(
  switchTypes.map(switchType => [switchType.name, switchType])
);