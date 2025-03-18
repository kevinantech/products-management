import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Footer from "./components/Footer/Footer.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import ProductsProvider from "./providers/ThemeProvider/ProductsProvider/ProductsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ProductsProvider>
        <App />
        <Footer />
      </ProductsProvider>
    </ThemeProvider>
  </StrictMode>
);
