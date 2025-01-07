import styles from "./SlideList.module.css";
import { SlideType } from "../../store/PresentationType";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { dispatch } from "../../store/editor";

type SlideListProps = {
  slides: SlideType[];
  selectedSlideIndex: number;
  onSelectSlide: (index: number) => void;
};

function SlideList({
  slides,
  selectedSlideIndex,
  onSelectSlide,
}: SlideListProps) {
  const { handleDragStart, handleDragOver, handleDragEnd } = useDragAndDrop({
    items: slides,
    onUpdate: (updatedSlides) => {
      dispatch((editor) => ({
        ...editor,
        presentation: {
          ...editor.presentation,
          slides: updatedSlides,
        },
      }));
    },
  });

  return (
    <div className={styles.slideList}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slideItem} ${
            index === selectedSlideIndex ? styles.selected : ""
          }`}
          onClick={() => onSelectSlide(index)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(event) => handleDragOver(event, index)}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.slideNumber}>{index + 1}</div>
          <SlidePreview slide={slide} />
        </div>
      ))}
    </div>
  );
}

type SlidePreviewProps = {
  slide: SlideType;
};

function SlidePreview({ slide }: SlidePreviewProps) {
  return (
    <div className={styles.previewContainer}>
      <div
        className={styles.slidePreview}
        style={{ background: slide.background.value }}
      >
        {slide.elements.map((element) => {
          if (element.type === "text") {
            return (
              <div
                key={element.id}
                className={styles.textElement}
                style={{
                  position: "absolute",
                  left: element.position.x,
                  top: element.position.y,
                  fontSize: element.fontSize,
                  color: element.color,
                  fontFamily: element.fontFamily,
                  width: element.size.width,
                }}
              >
                {element.content}
              </div>
            );
          } else if (element.type === "image") {
            return (
              <img
                key={element.id}
                src={element.url}
                alt={element.altText}
                className={styles.imageElement}
                style={{
                  position: "absolute",
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size.width,
                  height: element.size.height,
                }}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default SlideList;
