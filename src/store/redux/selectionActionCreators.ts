import { SelectionType } from "../EditorType";
import { ActionType } from "./actions";

export function setSelection(newSelection: SelectionType) {
    return {
        type: ActionType.SET_SELECTION,
        payload: newSelection,
    }
}