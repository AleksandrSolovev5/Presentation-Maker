import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";

export const store = createStore(editorReducer);

store.subscribe(() => {
  const state = store.getState(); // Получение текущего состояния редактора
  const editorState = JSON.stringify(state); // Преобразование состояния в строку JSON
  localStorage.setItem("presentation", editorState); // Сохранение строки в localStorage
});
