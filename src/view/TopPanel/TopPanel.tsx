import styles from "./TopPanel.module.css";
import { Button } from "../../components/button/Button";
import { dispatch } from "../../store/editor";
import { addSlide } from "../../store/addSlide";
import { removeSlide } from "../../store/removeSlide";
import { addImage } from "../../store/addImage";
import { addText } from "../../store/addText";
import { removeObject } from "../../store/removeObject";
import { changeSlideBackground } from "../../store/changeSlideBackground";
import { renamePresentationTitle } from "../../store/renamePresentationTitle";

type TopPanelProps = {
  title: string;
};

function TopPanel({ title }: TopPanelProps) {
  const handleAddSlide = () => {
    dispatch(addSlide);
  };

  const handleRemoveSlide = () => {
    dispatch(removeSlide);
  };
  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        dispatch(addImage, file);
      }
    };
    input.click();
  };
  const handleAddText = () => {
    dispatch(addText);
  };
  const handleDeleteObject = () => {
    dispatch(removeObject);
  };
  const handleChangeBackground = () => {
    dispatch(changeSlideBackground);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    dispatch(renamePresentationTitle, newTitle); // Обновляем название презентации
  };

  return (
    <div className={styles.topPanel}>
      <input
        className={styles.topPanelTitle}
        value={title}
        onChange={handleTitleChange}
        placeholder="Введите название презентации"
      />
      <div className={styles.buttonPanel}>
        <Button
          className={styles.button}
          text="Добавить слайд"
          onClick={handleAddSlide}
        />
        <Button
          className={styles.button}
          text="Удалить слайд"
          onClick={handleRemoveSlide}
        />
        <Button
          className={styles.button}
          text="Добавить картинку"
          onClick={handleAddImage}
        />
        <Button
          className={styles.button}
          text="Добавить текст"
          onClick={handleAddText}
        />
        <Button
          className={styles.button}
          text="Удалить"
          onClick={handleDeleteObject}
        />
        <Button
          className={styles.button}
          text="Изменить фон"
          onClick={handleChangeBackground}
        />
      </div>
    </div>
  );
}

export default TopPanel;
