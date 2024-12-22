import { EditorType } from "./EditorType";

function renamePresentationTitle(editor: EditorType, newTitle?: string): EditorType {
  if (!newTitle) {
    console.error("Новое название не передано.");
    return editor;
  }

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      title: newTitle,
    },
  };
}


export { renamePresentationTitle };
