import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Authorization } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authorization>
      <App />
    </Authorization>
  </React.StrictMode>
);
