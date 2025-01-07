import styles from "./WorkSpace.module.css";
import { SlideType } from "../../store/PresentationType";
import { dispatch, getEditor } from "../../store/editor";
import { EditorType } from "../../store/EditorType";
import { useDragAndDropElement } from "../../hooks/useDragAndDropElement";
import { useResizeElement } from "../../hooks/useResizeElement";

type SlideViewerProps = {
  slide: SlideType;
};

function WorkSpace({ slide }: SlideViewerProps) {
  const editor: EditorType = getEditor();

  // Обновление позиции элемента
  const updateElementPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    dispatch((editor) => {
      const updatedSlides = editor.presentation.slides.map((s) =>
        s.id === slide.id
          ? {
              ...s,
              elements: s.elements.map((el) =>
                el.id === id ? { ...el, position } : el
              ),
            }
          : s
      );
      return {
        ...editor,
        presentation: { ...editor.presentation, slides: updatedSlides },
      };
    });
  };

  // Обновление размеров элемента
  const updateElementSize = (
    id: string,
    size: { width: number; height: number; x: number; y: number }
  ) => {
    dispatch((editor) => {
      const updatedSlides = editor.presentation.slides.map((s) =>
        s.id === slide.id
          ? {
              ...s,
              elements: s.elements.map((el) =>
                el.id === id
                  ? { ...el, size, position: { x: size.x, y: size.y } }
                  : el
              ),
            }
          : s
      );
      return {
        ...editor,
        presentation: { ...editor.presentation, slides: updatedSlides },
      };
    });
  };

  // Обновление содержимого текста
  const updateElementContent = (id: string, content: string) => {
    dispatch((editor) => {
      const updatedSlides = editor.presentation.slides.map((s) =>
        s.id === slide.id
          ? {
              ...s,
              elements: s.elements.map((el) =>
                el.id === id ? { ...el, content } : el
              ),
            }
          : s
      );
      return {
        ...editor,
        presentation: { ...editor.presentation, slides: updatedSlides },
      };
    });
  };

  const { handleDragStart, handleDrag, handleDragEnd } = useDragAndDropElement({
    width: 935,
    height: 525,
  });

  const { startResize, handleResize, stopResize } = useResizeElement();

  // Выбор элемента
  const handleSelectElement = (id: string) => {
    dispatch((editor) => ({
      ...editor,
      selection: {
        ...editor.selection,
        selectedElementId: id,
      },
    }));
  };

  // Сброс выделения
  const handleDeselectElement = () => {
    dispatch((editor) => ({
      ...editor,
      selection: {
        ...editor.selection,
        selectedElementId: null,
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
      onMouseDown={(e) => {
        // Если клик произошел на пустой области, сбрасываем выделение
        if (e.target === e.currentTarget) {
          handleDeselectElement();
        }
      }}
    >
      {slide.elements.map((element) => {
        const isSelected = editor.selection.selectedElementId === element.id;

        return (
          <div
            key={element.id}
            className={styles.resizableElement}
            style={{
              position: "absolute",
              left: `${element.position.x}px`,
              top: `${element.position.y}px`,
              width: `${element.size.width}px`,
              height: `${element.size.height}px`,
              border:
                isSelected && element.type === "text"
                  ? "1px dashed #007bff"
                  : "none",
            }}
            onMouseDown={(e) =>
              handleDragStart(element.id, element.position, {
                x: e.clientX,
                y: e.clientY,
              })
            }
            onMouseMove={(e) => handleDrag(e, updateElementPosition)}
            onMouseUp={handleDragEnd}
          >
            {element.type === "text" ? (
              <textarea
                className={`${styles.textElement} ${
                  isSelected ? styles.selected : ""
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: `${element.fontSize}px`,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  border: "none",
                  outline: "none",
                  resize: "none",
                  background: "transparent",
                }}
                value={element.content}
                onFocus={() => handleSelectElement(element.id)}
                onChange={(e) =>
                  updateElementContent(element.id, e.target.value)
                }
              />
            ) : (
              <img
                src={element.url}
                alt={element.altText}
                className={`${styles.imageElement} ${
                  isSelected ? styles.selected : ""
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => handleSelectElement(element.id)}
              />
            )}

            {isSelected &&
              [
                "top",
                "bottom",
                "left",
                "right",
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ].map((dir) => (
                <div
                  key={dir}
                  className={`${styles.resizeHandle} ${styles[dir]}`}
                  onMouseDown={(e) =>
                    startResize(e, {
                      x: element.position.x,
                      y: element.position.y,
                      width: element.size.width,
                      height: element.size.height,
                    })
                  }
                  onMouseMove={(e) =>
                    handleResize(e.nativeEvent, (updatedData) =>
                      updateElementSize(element.id, updatedData)
                    )
                  }
                  onMouseUp={stopResize}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}

export default WorkSpace;
