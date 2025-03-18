import { ProductsContext } from "../../../contexts/Products";
import { useProducts } from "../../../hooks/useProducts";

export type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const products = useProducts();

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
