import { EditorType } from "./EditorType";

export function loadEditor(editor: EditorType, importedData: EditorType): EditorType {
    return {
        ...editor,
        presentation: importedData.presentation,
        selection: importedData.selection,
    };
}