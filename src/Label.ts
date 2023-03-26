
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
export class Label {
  // protected _anchor: Positions = Positions.topLeft;

  // protected _horizontalOffset: number = 0;

  // protected _verticalOffset: number = 0;
}

export class TextLabel extends Label {
  protected _text: string = "";
  protected _fontSize: number = 12;
  protected _color: string = "#FFFFFF";
};

export class IconLabel extends Label {
};


export default Label;