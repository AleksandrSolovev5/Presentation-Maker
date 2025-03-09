import { EditorType } from "./EditorType";
import { UpdateElementPositionAction } from "./redux/actions";

export function updateElementPosition(editor: EditorType, action: UpdateElementPositionAction): EditorType {
    const updatedSlides = editor.presentation.slides.map(slide => ({
        ...slide,
        content: slide.content.map(element =>
            element.id === action.payload.id ? { ...element, position: action.payload.position } : element
        )
    }));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}
