import { EditorType } from "./EditorType";
import { TextElement } from "./PresentationType";

function addText(
  editor: EditorType,
  content: string = "Введите текст"
): EditorType {
  if (!editor.selection?.selectedSlideId) {
    alert("Выберите слайд для добавления текста.");
    return editor;
  }

  const selectedSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === editor.selection.selectedSlideId
  );

  if (selectedSlideIndex === -1) {
    alert("Не удалось найти выбранный слайд.");
    return editor;
  }

  const newTextElement: TextElement = {
    id: `text${Date.now()}`, // Уникальный ID для элемента
    type: "text",
    position: { x: 50, y: 50 }, // Позиция по умолчанию
    size: { width: 300, height: 50 }, // Размер по умолчанию
    content,
    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
  };

  const updatedSlides = [...editor.presentation.slides];
  updatedSlides[selectedSlideIndex] = {
    ...updatedSlides[selectedSlideIndex],
    elements: [...updatedSlides[selectedSlideIndex].elements, newTextElement],
  };

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: updatedSlides,
    },
  };
}

export { addText };
