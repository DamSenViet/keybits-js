import Key from "./Key";
import Swappable from "./Swappable";

type KeyItems = Key | Cluster | Swappable;

class Cluster {
  protected _items: Array<KeyItems> = new Array<KeyItems>();
}

export default Cluster;