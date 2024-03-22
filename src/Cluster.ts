import Key from './Key'

export type ClusterItem = Key | Cluster

export interface ClusterOptions {
  name: string
  items: ClusterItem[]
}

export interface Cluster extends ClusterOptions {
  className: 'Cluster'
}

/**
 * Creates a default cluster with overridable options.
 * @param optons The overridable options.
 * @returns The cluster with overridden options.
 */
export const createCluster = (
  options: Partial<ClusterOptions> = {},
): Cluster => {
  const defaultClusterOptions: ClusterOptions = {
    name: '',
    items: [],
  }
  return {
    className: 'Cluster',
    ...defaultClusterOptions,
    ...options,
  }
}

export default Cluster
