import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import AlertProvider from "./nekrasovka-ui/Alert/alert.provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
