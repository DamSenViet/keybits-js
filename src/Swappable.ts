import Key from "./Key";
import Cluster from "./Cluster";

type SwappableItem = Key | Cluster | Swappable;

class Swappable {
  protected _options: Array<SwappableItem> = new Array<SwappableItem>();
  protected _defaultIndex = 0;
}

export default Swappable;