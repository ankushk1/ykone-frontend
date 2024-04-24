import React from "react";
import ReactDOM from "react-dom/client";
import App, { router } from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>
);
