import { EditorType } from "./EditorType.ts";
import { ChangeBackgroundColorAction } from "./redux/actions.ts";

export const changeBackgroundColor = (editor: EditorType, action: ChangeBackgroundColorAction): EditorType => {
    if (!editor.selection?.selectedSlideId) {
        return editor; 
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((slide) => {
                if (slide.id === editor.selection.selectedSlideId) {
                    return {
                        ...slide,
                        backgroundColor: action.payload,
                    };
                }
                return slide;
            }),
        },
    };
};
