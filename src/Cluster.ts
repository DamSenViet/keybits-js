import Key from "./Key";
import Swappable from "./Swappable";

export type ClusterItem = Key | Cluster | Swappable;

class Cluster {
  public items: Array<ClusterItem> = new Array<ClusterItem>();
}

export default Cluster;