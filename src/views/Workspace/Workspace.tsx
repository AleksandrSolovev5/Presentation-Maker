import { useRef, useEffect } from "react";
import styles from "./Workspace.module.css";
import { Slide } from "../../store/types";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppActions } from "../../hooks/useAppActions";

export function Workspace() {
  const slides = useAppSelector((editor) => editor.presentation.slides);
  const selection = useAppSelector((editor) => editor.selection);
  const slide: Slide =
    slides.find((slide) => slide.id === selection?.selectedSlideId) ||
    slides[0];

  const { setSelection, updateElementContent } = useAppActions();
  const {
    tempSlide,
    onDragStart,
    onDragOrResize,
    onDragEnd,
    getResizeHandles,
  } = useDragAndDrop(slide, selection?.selectedElementId || null);

  const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleTextInput = (elementId: string) => {
    const element = elementRefs.current[elementId];
    if (element) {
      const newText = element.textContent || "";
      updateElementContent(elementId, newText);
    }
  };

  const handleFocus = (elementId: string) => {
    setSelection({ selectedElementId: elementId, selectedSlideId: slide.id });
  };

  useEffect(() => {
    const selectedElementId = selection?.selectedElementId;
    if (selectedElementId) {
      const element = elementRefs.current[selectedElementId];
      if (element) {
        element.focus();
      }
    }
  }, [selection?.selectedElementId]);

  const resizeHandles = getResizeHandles();

  return (
    <div
      className={styles.workspaceContainer}
      style={{ backgroundColor: tempSlide?.backgroundColor || "white" }}
      onMouseMove={onDragOrResize}
      onMouseUp={onDragEnd}
    >
      {!tempSlide ? (
        <div>Нет слайдов</div>
      ) : (
        tempSlide.content.map((element) => {
          const isSelectedElement = selection?.selectedElementId === element.id;

          if (element.type === "text") {
            return (
              <div
                contentEditable
                suppressContentEditableWarning
                className={`${styles.element} ${
                  isSelectedElement ? styles.selected : ""
                }`}
                key={element.id}
                ref={(el) => (elementRefs.current[element.id] = el)}
                style={{
                  position: "absolute",
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size.width,
                  height: element.size.height,
                  fontFamily: element.fontFamily,
                  fontSize: element.fontSize,
                  cursor: isSelectedElement ? "grab" : "pointer",
                }}
                onFocus={() => handleFocus(element.id)}
                onBlur={() => handleTextInput(element.id)} 
                onMouseDown={(event) => onDragStart(event, null)}
              >
                {element.content}
              </div>
            );
          } else if (element.type === "image") {
            return (
              <img
                draggable="false"
                className={`${styles.element} ${
                  isSelectedElement ? styles.selected : ""
                }`}
                key={element.id}
                src={element.src}
                alt="Slide Image"
                style={{
                  position: "absolute",
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size.width,
                  height: element.size.height,
                  cursor: isSelectedElement ? "grab" : "pointer",
                }}
                onClick={() =>
                  setSelection({
                    selectedElementId: element.id,
                    selectedSlideId: slide.id,
                  })
                }
                onMouseDown={(event) => onDragStart(event, null)}
              />
            );
          }
          return null;
        })
      )}
      {resizeHandles.map((handle, index) => (
        <div
          key={index}
          className={styles[handle.id]}
          style={{
            position: "absolute",
            left: handle.x - 3,
            top: handle.y - 3,
            width: 8,
            height: 8,
            backgroundColor: "blue",
            borderRadius: "50%",
          }}
          onMouseDown={(event) => onDragStart(event, handle.id)}
        />
      ))}
    </div>
  );
}
