// import the render function
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
// the actual App component
import App from "./App";
import AddContact from "./components/AddContact";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
