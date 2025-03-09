import { EditorType } from "./EditorType.ts";
import { UpdateSlidesOrderAction } from "./redux/actions.ts";

export function updateSlidesOrder(editor: EditorType, action: UpdateSlidesOrderAction): EditorType {
	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: action.payload,
		},
	};
}
