import Cluster from "./Cluster";

class Swappable {
  /**
   * The name/alias of the Swappable.
   */
  public name: string = "";
  
  /**
   * Exclusive Optional selections as clusters.
   */
  public options: Cluster[] = [];
  
  /**
   * The index at which the default option is set to.
   */
  public defaultOptionIndex = 0;
}

export default Swappable;