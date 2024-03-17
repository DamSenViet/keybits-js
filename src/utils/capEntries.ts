export interface CapEntry {
  name: string
  // switchCutout: string
  // switchCutoutOffset: [number, number]
  stabilizerCutout?: string
  stabilizerCutoutOffset?: [number, number]
  boundingShape: [number, number][]
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
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ],
  }
}

export const cherry0100uX0100u = createCherryCap(1.0, 1.0)

export const cherry0125ux0100u = createCherryCap(1.25, 1.0)

export const cherry0150ux0100u = createCherryCap(1.5, 1.0)

export const cherry0175ux0100u = createCherryCap(1.75, 1.0)

export const cherry0200ux0100u = createCherryCap(2.0, 1.0)

export const cherry0225ux0100u = createCherryCap(2.25, 1.0)

export const cherry0250ux0100u = createCherryCap(2.5, 1.0)

export const cherry0275ux0100u = createCherryCap(2.75, 1.0)

export const cherry0300ux0100u = createCherryCap(3.0, 1.0)

export default [cherry0100uX0100u]
