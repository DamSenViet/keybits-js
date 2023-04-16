import Key from "./Key";
import Cluster from "./Cluster";

export type SwappableItem = Key | Cluster | Swappable;

class Swappable {
  public options: Array<SwappableItem> = new Array<SwappableItem>();
  public defaultIndex = 0;
}

export default Swappable;