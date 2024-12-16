import { EditorType } from "./EditorType";
import { ImageElement } from "./PresentationType";

function addImage(editor: EditorType, file: File): EditorType {
  if (!editor.selection?.selectedSlideId) {
    alert("Выберите слайд для добавления изображения.");
    return editor;
  }

  const selectedSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === editor.selection.selectedSlideId
  );

  if (selectedSlideIndex === -1) {
    alert("Не удалось найти выбранный слайд.");
    return editor;
  }

  const imageUrl = URL.createObjectURL(file); // Генерация временного URL для изображения

  const newImageElement: ImageElement = {
    id: `image${Date.now()}`, // Уникальный ID для элемента
    type: "image",
    position: { x: 50, y: 50 }, // Позиция по умолчанию
    size: { width: 300, height: 300 }, // Размер по умолчанию
    url: imageUrl,
    altText: file.name,
  };

  const updatedSlides = [...editor.presentation.slides];
  updatedSlides[selectedSlideIndex] = {
    ...updatedSlides[selectedSlideIndex],
    elements: [...updatedSlides[selectedSlideIndex].elements, newImageElement],
  };

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: updatedSlides,
    },
  };
}

export { addImage };
