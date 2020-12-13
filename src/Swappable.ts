import Key from "./Key";
import Cluster from "./Cluster";

type Item = Key | Cluster | Swappable;

class Swappable {
  protected _options: Array<Item> = new Array<Item>();
  protected _defaultIndex = 0;
}

export default Swappable;