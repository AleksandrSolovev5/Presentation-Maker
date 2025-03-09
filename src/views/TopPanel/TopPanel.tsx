import styles from "./TopPanel.module.css";
import { importFromFile } from "../../store/importFromFile.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppActions } from "../../hooks/useAppActions.ts";

export function TopPanel() {
  const titleName = useAppSelector((editor) => editor.presentation.title);
  const {
    addSlide,
    removeSlide,
    addTextElement,
    addImageElement,
    deleteElement,
    changeBackgroundColor,
    renamePresentationTitle,
    setEditor,
  } = useAppActions();

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    renamePresentationTitle(event.target.value);
  };

  const resizeInput = () => {
    const input = document.getElementById("name-change") as HTMLInputElement;
    if (input) {
      input.style.width = input.value.length + "ch";
    }
  };

  const onAddImageElement = () => {
    const fileInput = document.getElementById("image-create") as HTMLInputElement;
    fileInput?.click();
  };

  const onFileChange = () => {
    const fileInput = document.getElementById("image-create") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) addImageElement(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    fileInput.value = "";
  };

  const exportFromLocalStorage = () => {
    const editorData = localStorage.getItem("presentation");
    if (editorData) {
      const blob = new Blob([editorData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "presentation.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const openPresentation = () => {
    const fileInput = document.getElementById("save-button") as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <header className={styles.header}>
      <div className={styles.topPanel}>
        <input
          id="name-change"
          className={styles.presentationName}
          value={titleName}
          placeholder="Название"
          onChange={onTitleChange}
          onInput={resizeInput}
          maxLength={20}
        />

        <button onClick={addSlide}>Добавить слайд</button>
        <button onClick={removeSlide}>Удалить слайд</button>
        <button onClick={addTextElement}>Добавить текст</button>
        <button onClick={onAddImageElement}>Добавить изображение</button>
        <button onClick={deleteElement}>Удалить элемент</button>
        <button onClick={() => changeBackgroundColor("#FFD580")}>
          Изменить фон
        </button>

        <button onClick={exportFromLocalStorage}>Сохранить презентацию</button>
        <button onClick={openPresentation}>Открыть презентацию</button>

        <input
          id="image-create"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <input
          id="save-button"
          type="file"
          style={{ display: "none" }}
          onChange={(event) => importFromFile(event, setEditor)}
        />
      </div>
    </header>
  );
}
