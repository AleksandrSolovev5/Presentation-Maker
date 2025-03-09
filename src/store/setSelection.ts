import { EditorType } from "./EditorType.ts";
import { SetSelectionAction } from "./redux/actions.ts";

export function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {

    return {
        ...editor,
        selection: action.payload,
    }
}
