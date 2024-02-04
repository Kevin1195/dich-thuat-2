import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
