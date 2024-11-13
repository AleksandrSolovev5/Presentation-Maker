import { PresentationType } from "./PresentationType";

export const maxPresentation: PresentationType = {
  title: "Presentation name",
  slides: [
    {
      id: "slide1",
      background: { type: "color", value: "#FFFFFF" },
      elements: [
        {
          id: "text1",
          type: "text",
          position: { x: 200, y: 300 }, 
          size: { width: 300, height: 50 },
          content: "Welcome to the Presentation",
          fontSize: 35,
          fontFamily: "Arial",
          color: "#333333",
        },
      ],
      order: 1,
    },
    {
      id: "slide2",
      background: { type: "color", value: "#DFFFFF" },
      elements: [
        {
          id: "image1",
          type: "image",
          position: { x: 100, y: 100 },
          size: { width: 400, height: 400 },
          url: "example.jpg",
          altText: "Sample image",
        },
      ],
      order: 2,
    },
  ],
};
