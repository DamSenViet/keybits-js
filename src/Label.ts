
enum Positions {
  topLeft,
  topCenter,
  topRight,
  middleLeft,
  middleCenter,
  middleRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
};
class Label {
  // protected _anchor: Positions = Positions.topLeft;

  // protected _horizontalOffset: number = 0;

  // protected _verticalOffset: number = 0;
}

class TextLabel extends Label {
  protected _text: string = "";
  protected _textSize: number = 12;
  protected _textColor: string = "#FFFFFF";


  public text = "";
  public size = "";
};

class IconLabel extends Label {
  public constructor() {
    super();
  }
}