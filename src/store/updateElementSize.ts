import { EditorType } from './EditorType';
import { UpdateElementSizeAction } from './redux/actions';

export function updateElementSize(editor: EditorType, action: UpdateElementSizeAction): EditorType {

	const updatedSlides = editor.presentation.slides.map((slide) => ({
		...slide,
		content: slide.content.map((element) => {
			if (element.id === action.payload.id) {
				if (element.type === 'text' || element.type === 'image') {
					return {
						...element,
						size: action.payload.size,
					};
				}
			}
			return element;
		}),
	}));

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: updatedSlides,
		},
	};
}