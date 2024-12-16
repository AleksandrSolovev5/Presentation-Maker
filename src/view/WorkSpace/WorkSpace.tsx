import styles from "./WorkSpace.module.css";
import { SlideType } from "../../store/PresentationType";
import { dispatch, getEditor } from "../../store/editor"; // Импорт dispatch и getEditor
import { EditorType } from "../../store/EditorType"; // Импорт EditorType

type SlideViewerProps = {
  slide: SlideType;
};

function WorkSpace({ slide }: SlideViewerProps) {
  const editor: EditorType = getEditor(); // Получаем текущее состояние редактора

  const handleSelectElement = (id: string) => {
    dispatch((editor) => ({
      ...editor,
      selection: {
        ...editor.selection,
        selectedElementId: id, // Устанавливаем ID выбранного объекта
      },
    }));
  };

  return (
    <div
      className={styles.slideViewer}
      style={{
        background: slide.background.value,
        position: "relative",
        width: "935px",
        height: "525px",
        border: "1px solid #ddd",
      }}
    >
      {slide.elements.map((element) => {
        if (element.type === "text") {
          return (
            <textarea
              key={element.id}
              className={`${styles.textElement} ${
                editor.selection.selectedElementId === element.id
                  ? styles.selected
                  : ""
              }`}
              style={{
                position: "absolute",
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                fontSize: `${element.fontSize}px`,
                color: element.color,
                fontFamily: element.fontFamily,
                background: "transparent",
                outline: "none",
                resize: "none",
                overflow: "hidden",
                border:
                  editor.selection.selectedElementId === element.id
                    ? "1px solid #007bff"
                    : "none",
              }}
              defaultValue={element.content}
              onFocus={() => handleSelectElement(element.id)} // Установка выделения текста
            />
          );
        } else if (element.type === "image") {
          return (
            <img
              key={element.id}
              src={element.url}
              alt={element.altText}
              className={`${styles.imageElement} ${
                editor.selection.selectedElementId === element.id
                  ? styles.selected
                  : ""
              }`}
              style={{
                position: "absolute",
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                cursor: "pointer",
              }}
              onClick={() => handleSelectElement(element.id)} // Установка выделения изображения
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default WorkSpace;
