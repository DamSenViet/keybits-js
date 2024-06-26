import { Point } from '../geometry/spatial/point'

/**
 * A reusable CapEntry storing information about a Cap.
 * Referenced in the Key by name & resolved via Map.
 */
export interface CapEntry {
  /** The name of the CapEntry */
  name: string
  /** The reference of the switchCutout. */
  // switchCutout: string
  // switchCutoutOffset: [number, number]
  // stabilizerCutout?: string
  // stabilizerCutoutOffset?: [number, number]
  /** The bounding shape of the CapEntry represented as a closed set of coordinates. */
  boundingShape: Point[]
}

/**
 * Utility to generate basic cherry keycaps.
 * @param width The width of the cherry keycap.
 * @param height The height of the cherry keycap.
 * @returns A cap entry representing the cherry keycap.
 */
const createCherryCap = (width: number, height: number): CapEntry => {
  return {
    name: `Cherry ${width * 100}u X ${height * 100}u`,
    boundingShape: [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ],
  }
}

// standard library of cap entries

export const cherry0100uX0100u = createCherryCap(1.0, 1.0)

export const cherry0125ux0100u = createCherryCap(1.25, 1.0)

export const cherry0150ux0100u = createCherryCap(1.5, 1.0)

export const cherry0175ux0100u = createCherryCap(1.75, 1.0)

export const cherry0200ux0100u = createCherryCap(2.0, 1.0)

export const cherry0225ux0100u = createCherryCap(2.25, 1.0)

export const cherry0250ux0100u = createCherryCap(2.5, 1.0)

export const cherry0275ux0100u = createCherryCap(2.75, 1.0)

export const cherry0300ux0100u = createCherryCap(3.0, 1.0)

export const defaultCaps = [
  cherry0100uX0100u,
  cherry0125ux0100u,
  cherry0150ux0100u,
  cherry0175ux0100u,
  cherry0200ux0100u,
  cherry0225ux0100u,
  cherry0250ux0100u,
  cherry0275ux0100u,
  cherry0300ux0100u,
]

/**
 * A cap resolver is responsible for mapping cap entry names to their actual
 * entry information. This allows keys to store the cap information simply
 * as a string and be dynamically be resolved at compute time.
 */
export type CapResolver = Map<string, CapEntry>

/**
 * The default cap resolver for the keybits-js library. Includes all standard
 * cap entries.
 */
export const defaultCapResolver: CapResolver = new Map(
  defaultCaps.map((capEntry) => [capEntry.name, capEntry]),
)

export default defaultCaps
