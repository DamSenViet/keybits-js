/**
 * @file Information on various cap types to aid drawing generation.
 * UNUSED... BRAINSTORMING
 */

import { values } from 'lodash-es'
import { SwitchType, mx as mxSwitch } from './switchTypes'

/**
 * Valid cap names.
 */
export enum CapName {
  cherry = 'Cherry',
  sa = 'SA',
  kat = 'KAT',
  kam = 'KAM',
}

/**
 * Cap data represented as an object.
 */
export interface CapType {
  name: CapName // must be unique across caps
  switchType: SwitchType
}

export const cherry: CapType = {
  name: CapName.cherry,
  switchType: mxSwitch,
}

// export const sa: CapType = {
//   name: CapName.sa,
//   switchType: mxSwitch,
// };

// export const kat: CapType = {
//   name: CapName.kat,
//   switchType: mxSwitch,
// };

// export const kam: CapType = {
//   name: CapName.kam,
//   switchType: mxSwitch,
// };

/**
 * List of all valid cap names.
 */
export const capNames: CapName[] = values(CapName)

/**
 * List of all cap types.
 */
export const capTypes: CapType[] = [
  cherry,
  // sa,
  // kat,
  // kam,
]

/**
 * Mapping for CapName to CapType.
 */
export const capNameToCapType: Map<CapName, CapType> = new Map(
  capTypes.map((capType) => [capType.name, capType]),
)
