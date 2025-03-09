export type Presentation = {
	id: string;
	title: string;
	author: string;
	createdDate: Date;
	updateDate: Date;
	slides: Slide[];
};

export type Slide = {
	id: string;
	type: "slide";
	content: (TextElement | ImageElement)[];
	backgroundColor: string;
};

export type Position = {
	x: number,
	y: number,
};

export type Size = {
	width: number,
	height: number,
};

export type Element = {
	id: string;
	type: string;
	size: Size;
	position: Position;
};

export type TextElement = Element & {
	type: "text";
	content: string;
	fontSize: number;
	fontFamily: string;
};

export type ImageElement = Element & {
	type: "image";
	src: string;
};

export type Selection = {
	elementType: "text" | "image" | "slide";
	selectedElementId: string | null;
};