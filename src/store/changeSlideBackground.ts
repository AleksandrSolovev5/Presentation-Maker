import { EditorType } from "./EditorType";

function changeSlideBackground(editor: EditorType): EditorType {
  const lightOrange = "#FFD580"; // Светло-оранжевый цвет

  if (!editor.selection?.selectedSlideId) {
    alert("Выберите слайд для изменения фона.");
    return editor;
  }

  const selectedSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === editor.selection.selectedSlideId
  );

  if (selectedSlideIndex === -1) {
    alert("Не удалось найти выбранный слайд.");
    return editor;
  }

  const updatedSlides = [...editor.presentation.slides];
  updatedSlides[selectedSlideIndex] = {
    ...updatedSlides[selectedSlideIndex],
    background: { type: "color", value: lightOrange }, // Фиксированный цвет
  };

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: updatedSlides,
    },
  };
}

export { changeSlideBackground };
