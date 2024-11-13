import PresentationTitle from "./view/PresentationTitle/PresentationTitle";
import SlideList from "./view/SlideList/SlideList";
import WorkSpace from "./view/WorkSpace/WorkSpace";
import styles from './App.module.css';
import { maxPresentation } from "./store/testData";
import { PresentationType } from "./store/PresentationType";

// сделать превьюшки слайдов, исправить координаты для обьектов
type AppProps = {
  renderApp: () => void;
};

const state = {
  selectedSlideIndex: 0,
};

function App({ renderApp }: AppProps) {
  const presentation: PresentationType = maxPresentation;
  const { slides, title } = presentation;

  function selectSlide(index: number) {
    state.selectedSlideIndex = index;
    renderApp();  
  }

  const selectedSlide = slides[state.selectedSlideIndex];

  return (
    <div className={styles.app}>
      <div className={styles.topPanel}>
        <PresentationTitle title={title} />
      </div>

      <div className={styles.mainContainer}>
        <SlideList slides={slides} selectedSlideIndex={state.selectedSlideIndex} onSelectSlide={selectSlide} />
        <WorkSpace slide={selectedSlide} />
      </div>
    </div>
  );
}

export default App;
