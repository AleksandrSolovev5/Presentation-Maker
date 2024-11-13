import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

// функция для рендеринга приложения
function renderApp() {
  ReactDOM.render(<App renderApp={renderApp} />, rootElement);
}

renderApp();

