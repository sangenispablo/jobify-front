import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";

import App from "./App";
import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* 
      wrapper con el AppProvider el Componente App 
      para que tenga acceso al context toda la App
    */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
