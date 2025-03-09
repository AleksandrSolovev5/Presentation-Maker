import { EditorType } from "./EditorType";
import { generateId } from "./generateId.ts";
import { AddImageElementAction } from "./redux/actions.ts";

export const addImageElement = (editor: EditorType, action: AddImageElementAction): EditorType => {
	const newImageId = generateId(50);

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: editor.presentation.slides.map((slide) => {
				if (slide.id === editor.selection!.selectedSlideId) {
					return {
						...slide,
						content: [
							...slide.content,
							{
								id: newImageId,
								type: "image",
								src: action.payload,
								size: { width: 200, height: 150 },
								position: { x: 500, y: 300 },
							},
						],
					};
				}
				return slide;
			}),
		},
	};
};
