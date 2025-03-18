import { createContext } from "react";
import { useProducts } from "../hooks/useProducts";

export const ProductsContext = createContext(
  {} as ReturnType<typeof useProducts>
);
