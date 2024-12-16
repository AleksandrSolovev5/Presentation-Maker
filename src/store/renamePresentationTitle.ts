import { EditorType } from "./EditorType";

function renamePresentationTitle(
  editor: EditorType,
  newTitle: string
): EditorType {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      title: newTitle, // Изменяем название презентации
    },
  };
}

export { renamePresentationTitle };
