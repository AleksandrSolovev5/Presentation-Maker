type PresentationType = {
  title: string;
  slides: Array<SlideType>;
};

type SlideType = {
  id: string;
  background: BackgroundType;
  elements: Array<SlideElement>;
  order: number;
};

type BackgroundType = {
  type: "color" | "image" | "gradient";
  value: string;
};

type SlideElement = TextElement | ImageElement;

type BaseElement = {
  id: string;
  position: Position;
  size: Size;
};

type TextElement = BaseElement & {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  color: string;
};

type ImageElement = BaseElement & {
  type: "image";
  url: string;
  altText: string;
};

type Position = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

export type{
  PresentationType,
  SlideType,
  BackgroundType,
  TextElement,
  ImageElement,
  Position,
  Size,
};
