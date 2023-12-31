import Ajv from "ajv";
import transformationSchema from "./Transformation.schema";
import Point from "./Point";
import Line from "./Line";
import Polygon from "./Polygon";
import { isNumber } from "lodash";

export interface TransformationOptions {
  originX: number,
  originY: number,
  translateX: number,
  translateY: number,
  rotation: number,
  scaleX: number,
  scaleY: number,
}

export interface TransformationJSON {
  className: "Transformation",
  data: {
    originX: number,
    originY: number,
    translateX: number,
    translateY: number,
    rotation: number,
    scaleX: number,
    scaleY: number,
  }
}

/**
 * Transformation (composite)
 */
class Transformation {
  /**
   * Origin X component of the Transformation.
   */
  protected _originX: number = 0;

  /**
   * Origin Y component of the Transformation.
   */
  protected _originY: number = 0;

  /**
   * Translate X component of the Transformation.
   */
  protected _translateX: number = 0;

  /**
   * Translate Y component of the Transformation.
   */
  protected _translateY: number = 0;

  /**
   * Rotation of the Transformation.
   */
  protected _rotation: number = 0;

  /**
   * Scale X component of the Transformation.
   */
  protected _scaleX: number = 1;

  /**
   * Scale Y component of the Transformation.
   */
  protected _scaleY: number = 1;


  /**
   * Instantiates a Transformation.
   * @param options - a configuration Object with values as numbers.
   */
  public constructor(options?: Readonly<Transformation | TransformationOptions>) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    let originX: number;
    let originY: number;
    let translateX: number;
    let translateY: number;
    let rotation: number;
    let scaleX: number;
    let scaleY: number;
    if (options instanceof Transformation)
      ({
        _originX: originX,
        _originY: originY,
        _translateX: translateX,
        _translateY: translateY,
        _rotation: rotation,
        _scaleX: scaleX,
        _scaleY: scaleY,
      } = options as Transformation);
    else
      ({
        originX,
        originY,
        translateX,
        translateY,
        rotation,
        scaleX,
        scaleY,
      } = options as TransformationOptions);
    this.setOriginX(originX);
    this.setOriginY(originY);
    this.setTranslateX(translateX);
    this.setTranslateY(translateY);
    this.setRotation(rotation);
    this.setScaleX(scaleX);
    this.setScaleY(scaleY);
  }

  /**
   * Sets the originX of the Transformation.
   * @param originX - the originX for the Transformation
   */
  public setOriginX(originX: number): void {
    if (!isNumber(originX)) throw new TypeError();
    this._originX = originX;
  }


  /**
   * Sets the originY of the Transformation.
   * @param originY - the originY for the Transformation
   */
  public setOriginY(originY: number): void {
    if (!isNumber(originY)) throw new TypeError();
    this._originY = originY;
  }


  /**
   * Sets the translateX of the Transformation.
   * @param translateX - the translateX for the Transformation
   */
  public setTranslateX(translateX: number): void {
    if (!isNumber(translateX)) throw new TypeError();
    this._translateX = translateX;
  }


  /**
   * Sets the translateY of the Transformation.
   * @param translateY - the translateY for the Transformation
   */
  public setTranslateY(translateY: number): void {
    if (!isNumber(translateY)) throw new TypeError();
    this._translateY = translateY;
  }


  /**
   * Sets the rotation of the Transformation.
   * @param rotation - the rotation for the Transformation
   */
  public setRotation(rotation: number): void {
    if (!isNumber(rotation)) throw new TypeError();
    this._rotation = rotation;
  }

  /**
   * Sets the scaleX of the Transformation.
   * @param scaleX - the scaleX for the Transformation
   */
  public setScaleX(scaleX: number): void {
    if (!isNumber(scaleX)) throw new TypeError();
    this._scaleX = scaleX;
  }


  /**
   * Sets the scaleY of the Transformation.
   * @param scaleY - the scaleY for the Transformation
   */
  public setScaleY(scaleY: number): void {
    if (!isNumber(scaleY)) throw new TypeError();
    this._scaleY = scaleY;
  }


  /**
   * Determines whether invoking Transformation is equivalent to passed Transformation
   * @param transformation - the Transofrmation to compare against
   * @returns whether the Transformations are equal representations
   */
  public equals(transformation: Transformation): boolean {
    const {
      _originX,
      _originY,
      _translateX,
      _translateY,
      _rotation,
      _scaleX,
      _scaleY
    } = this;
    return (
      _originX === transformation._originX &&
      _originY === transformation._originY &&
      _translateX === transformation._translateX &&
      _translateY === transformation._translateY &&
      _rotation === transformation._rotation &&
      _scaleX === transformation._scaleX &&
      _scaleY === transformation._scaleY
    );
  }


  /**
   * Applies the transformation to the geometry.
   * @param point - the point to apply the transformation
   */
  public apply(point: Readonly<Point>): Point


  /**
   * Applies the transformation to the geometry.
   * @param line - the line to apply the transformation
   */
  public apply(line: Readonly<Line>): Line


  /**
   * Applies the transformation to the geometry.
   * @param polygon - the polygon to apply the transformation
   * @returns the polygon with transformations applied
   */
  public apply(polygon: Readonly<Polygon>): Polygon


  /**
   * Applies the transformation to the geometry.
   * @param geometry - the geometry to apply the transformation
   * @returns the geometry with the transformation applied
   */
  public apply(geometry: Readonly<Point | Line | Polygon | Transformation>): any {
    const {
      _originX,
      _originY,
      _translateX,
      _translateY,
      _rotation,
      _scaleX,
      _scaleY
    } = this;
    if (geometry instanceof Point) {
      const translated: Point = new Point({
        x: geometry.getX() + _translateX,
        y: geometry.getY() + _translateY,
      });

      const pi = Math.PI;
      const rotationRadian: number = _rotation * pi / 180;
      const sinTheta: number = Math.sin(rotationRadian);
      const cosTheta: number = Math.cos(rotationRadian);
      const originRelativeX: number = translated.getX() - _originX;
      const originRelativeY: number = translated.getY() - _originY;

      const rotated: Point = new Point({
        x: (
          (originRelativeX * cosTheta) -
          (originRelativeY * sinTheta)
        ) + _originX,
        y: (
          (originRelativeX * sinTheta) +
          (originRelativeY * cosTheta)
        ) + _originY,
      });

      const scaled: Point = new Point({
        x: rotated.getX() * _scaleX,
        y: rotated.getY() * _scaleY,
      });

      return new Point({
        x: scaled.getX(),
        y: scaled.getY(),
      });
    }
    else if (geometry instanceof Line) {
      return new Line({
        start: this.apply(geometry.getStart()),
        end: this.apply(geometry.getEnd()),
      });
    }
    else if (geometry instanceof Polygon) {
      return new Polygon({
        points: geometry.getPoints().map((point: Point) => {
          return this.apply(point)
        }),
      });
    }
    else throw new TypeError();
  }


  /**
   * Unapplies the transformation to the geometry.
   * @param point - the point to apply the transformation
   */
  public unapply(point: Readonly<Point>): Point


  /**
   * Unapplies the transformation to the geometry.
   * @param line - the line to apply the transformation
   */
  public unapply(line: Readonly<Line>): Line


  /**
   * Unapplies the transformation to the geometry.
   * @param polygon - the polygon to apply the transformation
   * @returns the polygon with transformations applied
   */
  public unapply(polygon: Readonly<Polygon>): Polygon


  /**
   * Applies the transformation to the geometry.
   * @param geometry - the geometry to apply the transformation
   * @returns the geometry with the transformation applied
   */
  public unapply(geometry: Readonly<Point | Line | Polygon | Transformation>): any {
    const {
      _originX,
      _originY,
      _translateX,
      _translateY,
      _rotation,
      _scaleX,
      _scaleY
    } = this;
    if (geometry instanceof Point) {

      const scaled: Point = new Point({
        x: geometry.getX() * (1 / _scaleX),
        y: geometry.getY() * (1 / _scaleY),
      });

      const pi = Math.PI;
      // radian is counter-clockwise, we want clockwise b/c of deg rotations
      const rotationRadian: number = -_rotation * pi / 180;
      const sinTheta: number = Math.sin(rotationRadian);
      const cosTheta: number = Math.cos(rotationRadian);
      const originRelativeX: number = scaled.getX() - _originX;
      const originRelativeY: number = scaled.getY() - _originY;

      const rotated: Point = new Point({
        x: (
          (originRelativeX * cosTheta) -
          (originRelativeY * sinTheta)
        ) + _originX,
        y: (
          (originRelativeX * sinTheta) -
          (originRelativeY * cosTheta)
        ) + _originY,
      });

      const translated: Point = new Point({
        x: rotated.getX() + _translateX,
        y: rotated.getY() + _translateY,
      });


      return new Point({
        x: translated.getX(),
        y: translated.getY(),
      });
    }
    else if (geometry instanceof Line) {
      return new Line({
        start: this.apply(geometry.getStart()),
        end: this.apply(geometry.getEnd()),
      });
    }
    else if (geometry instanceof Polygon) {
      return new Polygon({
        points: geometry.getPoints().map((point: Point) => {
          return this.apply(point)
        }),
      });
    }
    else throw new TypeError();
  }


  /**
   * Creates a Transformation from a JSON object.
   * @param transformationJSON 
   */
  public static fromJSON(transformationJSON: Readonly<TransformationJSON>): Transformation {
    const ajv = new Ajv();
    if (!ajv.validate(transformationSchema, transformationJSON)) throw new TypeError();
    const {
      originX: originXJSON,
      originY: originYJSON,
      translateX: translateXJSON,
      translateY: translateYJSON,
      rotation: rotationJSON,
      scaleX: scaleXJSON,
      scaleY: scaleYJSON,
    } = transformationJSON.data;
    const originX = Number(originXJSON);
    const originY = Number(originYJSON);
    const translateX = Number(translateXJSON);
    const translateY = Number(translateYJSON);
    const rotation = Number(rotationJSON);
    const scaleX = Number(scaleXJSON);
    const scaleY = Number(scaleYJSON);
    return new Transformation({
      originX,
      originY,
      translateX,
      translateY,
      rotation,
      scaleX,
      scaleY,
    });
  }


  /**
   * Creates a JSON object from invoking Transformation.
   * @returns the JSON representation of the Transformation
   */
  public toJSON(): TransformationJSON {
    const {
      _originX,
      _originY,
      _translateX,
      _translateY,
      _rotation,
      _scaleX,
      _scaleY,
    } = this;
    return {
      className: "Transformation",
      data: {
        originX: _originX,
        originY: _originY,
        translateX: _translateX,
        translateY: _translateY,
        rotation: _rotation,
        scaleX: _scaleX,
        scaleY: _scaleY,
      },
    };
  }
};



export default Transformation;