import { EditorType } from "../EditorType";
import { generateId } from "../generateId";

export const defaultEditor: EditorType = {
	presentation: {
		id: generateId(50),
		author: 'Author',
		createdDate: new Date(),
		updateDate: new Date(),
		title: 'Название презентации',
		slides: [
			{
				id: generateId(50),
				type: 'slide',
				content: [],
				backgroundColor: 'white'
			}
		],
	},
	selection: {
		selectedSlideId: null,
		selectedElementId: null,
	}
}