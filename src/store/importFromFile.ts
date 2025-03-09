import { EditorType } from './EditorType';
import Ajv from 'ajv';
import addFormats from "ajv-formats"

export const importFromFile = (event: React.ChangeEvent<HTMLInputElement>,
	setEditor: (editor: EditorType) => void
) => {
	const file = event.target.files?.[0];
	const ajv = new Ajv();
	addFormats(ajv);

	if (file) {
		const reader = new FileReader();

		reader.onload = () => {
			const fileContent = reader.result as string;
			const importedEditorData = JSON.parse(fileContent) as EditorType;

			const schema = {
				type: "object",
				properties: {
					presentation: {
						type: "object",
						properties: {
							id: { type: "string" },
							title: { type: "string" },
							author: { type: "string" },
							createdDate: {
								type: "string",
								format: "date-time"
							},
							updateDate: {
								type: "string",
								format: "date-time"
							},
							slides: { type: "array", items: { type: "object" } }
						},
						required: ["id", "title", "author", "createdDate", "updateDate", "slides"],
						additionalProperties: false
					},
					selection: {
						type: "object",
						properties: {
							selectedSlideId: { type: ["string", "null"] },
							selectedElementId: { type: ["string", "null"] }
						},
						additionalProperties: false
					},
				},
				required: ["presentation", "selection"],
				additionalProperties: false
			}

			const validate = ajv.compile(schema);
			const valid = validate(importedEditorData);
			if (valid) {
				setEditor(importedEditorData)
				console.log("Успешныый импорт")
			} else {
				console.log("Ошибка импорта");
			}
		};

		reader.readAsText(file);
	}

	event.target.value = ''
};
