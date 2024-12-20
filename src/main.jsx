import { MaterialTailwindControllerProvider } from "@/context";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import store from "./redux/store";

import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import App from "./App";
let persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
