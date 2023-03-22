import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@material-tailwind/react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
