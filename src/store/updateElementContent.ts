import { EditorType } from "./EditorType";
import { UpdateElementContentAction } from "./redux/actions";

export function updateElementContent(editor: EditorType, action: UpdateElementContentAction): EditorType {
    const updatedSlides = editor.presentation.slides.map(slide => ({
        ...slide,
        content: slide.content.map(element =>
            element.id === action.payload.id
                ? { ...element, content: action.payload.newText }
                : element
        )
    }));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    };
}
