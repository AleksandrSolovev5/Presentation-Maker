import { EditorType } from "./EditorType";
import { maxPresentation } from "./testData";

let _editor: EditorType = {
  presentation: maxPresentation,
  selection: {
    selectedSlideId: maxPresentation.slides[0]?.id || null,
    selectedElementId: null,
  },
};

let _handler: (() => void) | null = null;

function getEditor(): EditorType {
  return _editor;
}

function setEditor(newEditor: EditorType): void {
  _editor = newEditor;
}

function dispatch<T = unknown>(
  modifyFn: (editor: EditorType, payload?: T) => EditorType,
  payload?: T
): void {
  const newEditor = modifyFn(_editor, payload);
  setEditor(newEditor);

  if (_handler) {
    _handler();
  }
}


function addEditorChangeHandler(handler: () => void): void {
  _handler = handler;
}

export { getEditor, setEditor, dispatch, addEditorChangeHandler };
