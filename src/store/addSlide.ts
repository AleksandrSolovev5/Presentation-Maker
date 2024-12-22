import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";

function addSlide(editor: EditorType): EditorType {
  const selectedSlideId = editor.selection?.selectedSlideId;
  const currentSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id === selectedSlideId
  );

  const newSlide: SlideType = {
    id: `slide${Date.now()}`, 
    background: { type: "color", value: "#FFFFFF" },
    elements: [],
    order: editor.presentation.slides.length + 1,
  };

  const updatedSlides = [...editor.presentation.slides];

  // вставляем новый слайд после выбранного
  const insertIndex =
    currentSlideIndex !== -1 ? currentSlideIndex + 1 : updatedSlides.length;
  updatedSlides.splice(insertIndex, 0, newSlide);

  // обновляем порядок  слайдов
  const reorderedSlides = updatedSlides.map((slide, index) => ({
    ...slide,
    order: index + 1,
  }));

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: reorderedSlides,
    },
    selection: {
      selectedSlideId: newSlide.id,
      selectedElementId: null, 
    },
  };
}

export { addSlide };
