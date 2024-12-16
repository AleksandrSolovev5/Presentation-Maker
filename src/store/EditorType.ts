import { PresentationType } from "./PresentationType";

export type EditorType = {
  presentation: PresentationType;
  selection: {
    selectedSlideId: string | null;
    selectedElementId: string | null; // Добавлено поле для выделенного объекта
  };
};
