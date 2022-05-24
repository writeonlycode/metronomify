// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom";

import Providers from "./components/Providers";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Providers>
      <App />
    </Providers>,
    document.body.appendChild(document.createElement("div"))
  );
});
