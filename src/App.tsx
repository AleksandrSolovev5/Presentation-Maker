import { TopPanel } from "./views/TopPanel/TopPanel";
import { SlidesList } from "./views/SledeList/SlidesList";
import { Workspace } from "./views/Workspace/Workspace";
import { useEffect } from "react";
import styles from "./App.module.css";

function App() {
  useEffect(() => {
    const disableZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", disableZoom, { passive: false });
  }, []);

  return (
    <>
      <TopPanel></TopPanel>
      <div className={styles.container}>
        <SlidesList></SlidesList>
        <Workspace></Workspace>
      </div>
    </>
  );
}

export default App;
