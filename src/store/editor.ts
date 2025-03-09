import { editor } from './data.ts';
import { EditorType } from './EditorType.ts';

let _editor: EditorType = loadEditorFromLocalStorage() || editor;
let _handler: (() => void) | null = null;

type ModifyFn = (edtor: EditorType, payload: any) => EditorType

export function loadEditorFromLocalStorage(): EditorType {
    const savedState = localStorage.getItem("presentation");
    if (savedState) {
        return JSON.parse(savedState) as EditorType;
    }
    return editor
}

export function getEditor() {
    return _editor;
}

export function setEditor(newEditor: EditorType) {
    _editor = newEditor;
}

export function dispatch(modifyFn: ModifyFn, payload?: object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}

export function addEditorChangeHandler(handler: () => void): void {
    _handler = handler;
}
