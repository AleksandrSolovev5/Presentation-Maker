import styles from "./SlideList.module.css";
import { SlideType } from "../../store/PresentationType";

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
  return (
    <div className={styles.slideList}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slideItem} ${
            index === selectedSlideIndex ? styles.selected : ""
          }`}
          onClick={() => onSelectSlide(index)}
        >
          {/* Номер слайда */}
          <div className={styles.slideNumber}>{index + 1}</div>
          {/* Превью слайда */}
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
