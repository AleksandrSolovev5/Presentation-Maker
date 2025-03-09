import { EditorType } from "../EditorType";
import { ActionType } from "./actions";

export function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}