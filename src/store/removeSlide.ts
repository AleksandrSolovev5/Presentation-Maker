import { EditorType } from "./EditorType";

function removeSlide(editor: EditorType): EditorType {
  if (!editor.selection?.selectedSlideId) {
    return editor; // возвращаем текущее состояние когда слайд не выделен
  }

  const removeSlideId = editor.selection.selectedSlideId;
  const removeSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === removeSlideId
  );

  const newSlides = editor.presentation.slides.filter(
    (slide) => slide.id !== removeSlideId
  );

  let newSelectedSlideId = null;
  if (newSlides.length > 0) {
    const index = Math.min(removeSlideIndex, newSlides.length - 1);
    newSelectedSlideId = newSlides[index].id;
  }

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selection: {
      selectedSlideId: newSelectedSlideId, 
      selectedElementId: null, 
    },
  };
}

export { removeSlide };
