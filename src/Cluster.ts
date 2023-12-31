import Key from './Key'
import Swappable from './Swappable'

export type ClusterItem = Key | Cluster | Swappable

class Cluster {
  /**
   * The name/alias of the Cluster.
   */
  public name: string = ''

  public items: Array<ClusterItem> = new Array<ClusterItem>()
}

export default Cluster
