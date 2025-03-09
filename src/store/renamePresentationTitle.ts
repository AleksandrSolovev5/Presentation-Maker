import {EditorType} from "./EditorType.ts";
import { RenamePresentationTitleAction } from "./redux/actions.ts";

export function renamePresentationTitle(editor: EditorType, action: RenamePresentationTitleAction): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: action.payload,
        }
    }
}
