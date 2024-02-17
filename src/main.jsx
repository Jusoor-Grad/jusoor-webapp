//SECTION - GENERAL
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

//SECTION I18N
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

//SECTION REACT-ROUTER
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

//SECTION - REDUX
import { store } from "./store/store";
import { Provider } from "react-redux";

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <NextUIProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NextUIProvider>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
