import { EditorType, SelectionType } from "../EditorType";
import { Position, Size, Slide } from "../types";

export enum ActionType {
  ADD_SLIDE = "addSlide",
  REMOVE_SLIDE = "removeSlide",
  ADD_TEXT = "addTextElement",
  ADD_IMAGE = "addImageElement",
  DELETE_ELEMENT = "deleteElement",
  CHANGE_BACKGROUND_COLOR = "changeBackgroundColor",
  RENAME_PRESENTATION_TITLE = "renamePresentationTitle",
  UPDATE_ELEMENT_CONTENT = "updateElementContent",
  UPDATE_ELEMENT_POSITION = "updateElementPosition",
  UPDATE_ELEMENT_SIZE = "updateElementSize",
  UPDATE_SLIDES_ORDER = "updateSlidesOrder",
  SET_SELECTION = "setSelection",
  SET_EDITOR = "setEditor",
}

type AddSlideAction = {
  type: ActionType.ADD_SLIDE;
};

type RemoveSlideAction = {
  type: ActionType.REMOVE_SLIDE;
};

type AddTextElementAction = {
  type: ActionType.ADD_TEXT;
};

export type AddImageElementAction = {
  type: ActionType.ADD_IMAGE;
  payload: string;
};

type DeleteElementAction = {
  type: ActionType.DELETE_ELEMENT;
};

export type ChangeBackgroundColorAction = {
  type: ActionType.CHANGE_BACKGROUND_COLOR;
  payload: string;
};

export type RenamePresentationTitleAction = {
  type: ActionType.RENAME_PRESENTATION_TITLE;
  payload: string;
};

export type UpdateElementContentAction = {
  type: ActionType.UPDATE_ELEMENT_CONTENT;
  payload: {
    id: string;
    newText: string;
  };
};

export type UpdateElementPositionAction = {
  type: ActionType.UPDATE_ELEMENT_POSITION;
  payload: {
    id: string;
    position: Position;
  };
};

export type UpdateElementSizeAction = {
  type: ActionType.UPDATE_ELEMENT_SIZE;
  payload: {
    id: string;
    size: Size;
  };
};

export type UpdateSlidesOrderAction = {
  type: ActionType.UPDATE_SLIDES_ORDER;
  payload: Slide[];
};

export type SetSelectionAction = {
  type: ActionType.SET_SELECTION;
  payload: SelectionType;
};

export type SetEditorAction = {
  type: ActionType.SET_EDITOR;
  payload: EditorType;
};

export type EditorAction =
  | AddSlideAction
  | RemoveSlideAction
  | AddTextElementAction
  | AddTextElementAction
  | AddImageElementAction
  | DeleteElementAction
  | ChangeBackgroundColorAction
  | RenamePresentationTitleAction
  | UpdateElementContentAction
  | UpdateElementPositionAction
  | UpdateElementSizeAction
  | UpdateSlidesOrderAction
  | SetSelectionAction
  | SetEditorAction;
