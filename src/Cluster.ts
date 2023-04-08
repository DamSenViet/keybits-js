import Key from "./Key";
import Swappable from "./Swappable";

export type ClusterItems = Key | Cluster | Swappable;

class Cluster {
  protected _items: Array<ClusterItems> = new Array<ClusterItems>();
}

export default Cluster;