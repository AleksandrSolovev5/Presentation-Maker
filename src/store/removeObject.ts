import { EditorType } from "./EditorType";

function removeObject(editor: EditorType): EditorType {
  if (!editor.selection?.selectedSlideId) {
    alert("Выберите слайд.");
    return editor;
  }

  const selectedSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === editor.selection?.selectedSlideId
  );

  if (selectedSlideIndex === -1) {
    alert("Не удалось найти выбранный слайд.");
    return editor;
  }

  const selectedElementId = editor.selection?.selectedElementId;

  if (!selectedElementId) {
    alert("Выберите объект для удаления.");
    return editor;
  }

  const updatedSlides = [...editor.presentation.slides];
  updatedSlides[selectedSlideIndex].elements = updatedSlides[
    selectedSlideIndex
  ].elements.filter((element) => element.id !== selectedElementId);

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: updatedSlides,
    },
    selection: {
      ...editor.selection,
      selectedElementId: null, // Сбрасываем выделение объекта
    },
  };
}

export { removeObject };
