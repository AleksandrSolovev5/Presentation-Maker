import { Slide } from "../types"
import { ActionType } from "./actions"

export function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

export function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

export function updateSlidesOrder(slides: Slide[]) {
    return {
        type: ActionType.UPDATE_SLIDES_ORDER,
        payload: slides
    }
}