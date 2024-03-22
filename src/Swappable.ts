import Cluster from './Cluster'

interface SwappableOptions {
  name: string
  options: Cluster[]
  defaultOptionIndex: number
}

interface Swappable extends SwappableOptions {
  className: 'Swappable'
}

export function createSwappable(options: Partial<SwappableOptions>): Swappable {
  const defaultOptions: SwappableOptions = {
    name: 'Swappable',
    options: [],
    defaultOptionIndex: 0,
  }

  return {
    className: 'Swappable',
    ...defaultOptions,
    ...options,
  }
}
