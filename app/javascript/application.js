// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
