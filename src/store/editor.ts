import { EditorType } from "./EditorType";

const LOCAL_STORAGE_KEY = "presentation_editor_state";

export function saveEditorState(editor: EditorType): void {
  try {
    const state = JSON.stringify(editor);
    localStorage.setItem(LOCAL_STORAGE_KEY, state);
  } catch (error) {
    console.error("Error saving editor state to localStorage:", error);
  }
}

export function loadEditorState(): EditorType | null {
  try {
    const state = localStorage.getItem(LOCAL_STORAGE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error("Error loading editor state from localStorage:", error);
    return null;
  }
}

let editor: EditorType = loadEditorState() || {
  // Начальное состояние редактора (если в localStorage ничего нет)
  presentation: {
    title: "Моя презентация",
    slides: [],
  },
  selection: {
    selectedSlideId: null,
    selectedElementId: null,
  },
};

// Изменяем состояние редактора
export function dispatch(updater: (editor: EditorType) => EditorType): void {
  editor = updater(editor);
  saveEditorState(editor); // Сохраняем обновленное состояние в localStorage
}

// Получаем текущее состояние редактора
export function getEditor(): EditorType {
  return editor;
}

// Добавляем обработчик изменений (как и раньше)
const editorChangeHandlers: (() => void)[] = [];

export function addEditorChangeHandler(handler: () => void): void {
  editorChangeHandlers.push(handler);
}
