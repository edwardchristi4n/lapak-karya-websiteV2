import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { LocaleProvider } from "../i18n";
import { MitraPage } from "../components/mitra/MitraPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <MitraPage />
    </LocaleProvider>
  </StrictMode>,
);
