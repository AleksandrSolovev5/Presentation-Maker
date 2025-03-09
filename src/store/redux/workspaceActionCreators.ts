import { Position, Size } from "../types";
import { ActionType } from "./actions";

export function addTextElement() {
	return {
		type: ActionType.ADD_TEXT
	}
}

export function addImageElement(imageSrc: string) {
	return {
		type: ActionType.ADD_IMAGE,
		payload: imageSrc
	}
}

export function deleteElement() {
	return {
		type: ActionType.DELETE_ELEMENT
	}
}

export function changeBackgroundColor(color: string) {
	return {
		type: ActionType.CHANGE_BACKGROUND_COLOR,
		payload: color
	}
}

export function renamePresentationTitle(newTitle: string) {
	return {
		type: ActionType.RENAME_PRESENTATION_TITLE,
		payload: newTitle
	}
}

export function updateElementContent(id: string, newText: string) {
	return {
		type: ActionType.UPDATE_ELEMENT_CONTENT,
		payload: { id, newText }
	}
}

export function updateElementPosition(id: string, position: Position) {
	return {
		type: ActionType.UPDATE_ELEMENT_POSITION,
		payload: {id, position}
	}
}

export function updateElementSize(id: string, size: Size) {
	return {
		type: ActionType.UPDATE_ELEMENT_SIZE,
		payload: {id, size}
	}
}