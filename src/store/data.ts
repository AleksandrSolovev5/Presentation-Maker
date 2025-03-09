import { Presentation } from "./types";
import { EditorType } from "./EditorType";
import { generateId } from "./generateId";

export const minPresentation: Presentation = {
  id: generateId(50),
  title: "Presentation",
  author: "Author",
  createdDate: new Date(),
  updateDate: new Date(),
  slides: [
    {
      id: generateId(50),
      type: "slide",
      content: [],
      backgroundColor: "white",
    },
  ],
};

export const maxPresentation: Presentation = {
  id: "presentation-maximal",
  title: "Maximal Presentation",
  author: "Author 2",
  createdDate: new Date("2024-01-01"),
  updateDate: new Date("2024-01-02"),
  slides: [
    {
      id: "slide-012",
      type: "slide",
      content: [
        {
          id: "text123",
          type: "text",
          content: "Hello World!",
          fontSize: 16,
          fontFamily: "Arial",
          size: { width: 100, height: 50 },
          position: { x: 500, y: 400 },
        },
        {
          id: "image123",
          type: "image",
          src: "vite.svg",
          size: { width: 300, height: 300 },
          position: { x: 0, y: 0 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-011",
      type: "slide",
      content: [
        {
          id: "text2876980",
          type: "text",
          content: "Another Slide!",
          fontSize: 20,
          fontFamily: "Arial",
          size: { width: 150, height: 60 },
          position: { x: 15, y: 15 },
        },
        {
          id: "image257675673",
          type: "image",
          src: "hello.png",
          size: { width: 300, height: 300 },
          position: { x: 25, y: 25 },
        },
      ],
      backgroundColor: "red",
    },
    {
      id: "slide-008",
      type: "slide",
      content: [
        {
          id: "image11111",
          type: "image",
          src: "hello.png",
          size: { width: 500, height: 300 },
          position: { x: 20, y: 20 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-007",
      type: "slide",
      content: [
        {
          id: "image1575658678",
          type: "image",
          src: "vite.svg",
          size: { width: 300, height: 300 },
          position: { x: 20, y: 20 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-006",
      type: "slide",
      content: [
        {
          id: "image1686787980",
          type: "image",
          src: "vite.svg",
          size: { width: 300, height: 300 },
          position: { x: 20, y: 20 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-005",
      type: "slide",
      content: [
        {
          id: "text11234576",
          type: "text",
          content: "Hello World!",
          fontSize: 16,
          fontFamily: "Arial",
          size: { width: 100, height: 50 },
          position: { x: 10, y: 10 },
        },
        {
          id: "image19876543",
          type: "image",
          src: "vite.svg",
          size: { width: 300, height: 300 },
          position: { x: 100, y: 100 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-004",
      type: "slide",
      content: [
        {
          id: "image167483393",
          type: "image",
          src: "vite.svg",
          size: { width: 150, height: 300 },
          position: { x: 500, y: 20 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-003",
      type: "slide",
      content: [
        {
          id: "image11282458",
          type: "image",
          src: "vite.svg",
          size: { width: 300, height: 300 },
          position: { x: 20, y: 20 },
        },
      ],
      backgroundColor: "white",
    },
    {
      id: "slide-002",
      type: "slide",
      content: [
        {
          id: "text156879245",
          type: "text",
          content: "Hello World!",
          fontSize: 16,
          fontFamily: "Arial",
          size: { width: 100, height: 50 },
          position: { x: 10, y: 10 },
        },
        {
          id: "image1658769835",
          type: "image",
          src: "vite.svg",
          size: { width: 300, height: 300 },
          position: { x: 20, y: 20 },
        },
      ],
      backgroundColor: "white",
    },
  ],
};

export const editor: EditorType = {
  presentation: minPresentation,
  selection: {
    selectedSlideId: null,
    selectedElementId: null,
  },
};
