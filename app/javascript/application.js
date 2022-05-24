// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./components/App/App";

const queryClient = new QueryClient();

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
