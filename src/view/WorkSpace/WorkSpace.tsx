import styles from "./WorkSpace.module.css";
import { SlideType } from "../../store/PresentationType";

type SlideViewerProps = {
  slide: SlideType;
};

function WorkSpace({ slide }: SlideViewerProps) {
  return (
    <div
      className={styles.slideViewer}
      style={{ background: slide.background.value }}
    >
      {slide.elements.map((element) => {
        if (element.type === "text") {
          return (
            <div
              key={element.id}
              style={{
                position: "absolute",
                left: element.position.x,
                top: element.position.y,
                fontSize: element.fontSize,
                color: element.color,
                fontFamily: element.fontFamily,
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
  );
}

export default WorkSpace;
