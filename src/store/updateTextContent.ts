import { EditorType } from "./EditorType";

function updateTextContent(
  editor: EditorType,
  elementId: string,
  newText: string
): EditorType {
  const selectedSlideId = editor.selection?.selectedSlideId;

  if (!selectedSlideId) {
    alert("Не выбран слайд.");
    return editor;
  }

  const slideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === selectedSlideId
  );

  if (slideIndex === -1) {
    alert("Не удалось найти выбранный слайд.");
    return editor;
  }

  const slide = editor.presentation.slides[slideIndex];
  const elementIndex = slide.elements.findIndex((el) => el.id === elementId);

  if (elementIndex === -1) {
    alert("Не удалось найти элемент для обновления текста.");
    return editor;
  }

  const updatedElement = {
    ...slide.elements[elementIndex],
    content: newText,
  };

  const updatedSlides = [...editor.presentation.slides];
  updatedSlides[slideIndex] = {
    ...slide,
    elements: [
      ...slide.elements.slice(0, elementIndex),
      updatedElement,
      ...slide.elements.slice(elementIndex + 1),
    ],
  };

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: updatedSlides,
    },
  };
}

export { updateTextContent };
