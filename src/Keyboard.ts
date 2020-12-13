import Layout from "./Layout";

class Keyboard {
  public name = "";
  public url = "";
  public maintainer = "";
  public matrix = [];
  public layouts: Array<Layout> = [];

  // json
  public constructor(json) {
    this.name = json.name;
    this.url = json.url;
  }

  // needs to call on other parse
  public static fromJSON() {
    
  }
  
  public toJSON() {
    
  }

}

export default Keyboard;