import TopPanel from "./view/TopPanel/TopPanel";
import SlideList from "./view/SlideList/SlideList";
import WorkSpace from "./view/WorkSpace/WorkSpace";
import styles from "./App.module.css";
import { getEditor, dispatch, addEditorChangeHandler } from "./store/editor";
import { EditorType } from "./store/EditorType";

type AppProps = {
  renderApp: () => void;
};

function App({ renderApp }: AppProps) {
  const editor: EditorType = getEditor(); // Получаем текущее состояние редактора
  const { slides, title } = editor.presentation;
  const selectedSlideId = editor.selection.selectedSlideId;
  const selectedSlide = slides.find((slide) => slide.id === selectedSlideId);

  function selectSlide(index: number): void {
    const selectedSlideId = slides[index]?.id || null;
    dispatch((editor: EditorType) => ({
      ...editor,
      selection: {
        selectedSlideId,
        selectedElementId: null,
      },
    }));
    renderApp();
  }

  addEditorChangeHandler(renderApp);

  return (
    <div className={styles.app}>
      <TopPanel title={title} />
      <div className={styles.mainContainer}>
        <SlideList
          slides={slides}
          selectedSlideIndex={slides.findIndex((s) => s.id === selectedSlideId)}
          onSelectSlide={selectSlide}
        />
        {selectedSlide && <WorkSpace slide={selectedSlide} />}
      </div>
    </div>
  );
}

export default App;
