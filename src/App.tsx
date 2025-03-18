import { Button } from "@mui/material";
import { ArrowDownUp, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { ProductsContext } from "./contexts/Products";
import { ProductForm } from "./components/ProductForm";
function App() {
  const [isProductFormOpen, setProductFormOpen] = useState(false);
  const { products } = useContext(ProductsContext);

  return (
    <main className="container mx-auto p-8 md:px-0">
      <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-wrap gap-6 items-center justify-between py-8 px-6 bg-sky-50 bg-opacity-75">
          <div>
            <h1 className="text-2xl font-semibold">Gestión de Productos</h1>
            <p className="mt-1 text-sm text-gray-600">
              Administra tu inventario de productos fácilmente
            </p>
          </div>
          <Button
            startIcon={<Plus className="h-4 w-4 mr-2" />}
            onClick={() => setProductFormOpen(true)}
            size="large"
          >
            Nuevo Producto
          </Button>
        </div>
        <div className="p-6">
          <nav className="flex items-center justify-end mb-4">
            Ordenar por:
            <button className="p-2 rounded border border-gray-200 transition-colors duration-200 hover:bg-sky-50 hover:bg-opacity-75">
              <ArrowDownUp className="h-4 w-4" />
            </button>
          </nav>
          <div className="rounded-lg border border-gray-200">{"Content"}</div>
        </div>
        <p className="pt-3 pb-6 px-6 text-sm text-gray-600 bg-sky-50 bg-opacity-50">
          Total de productos: {products.length}
        </p>
      </div>
      <ProductForm
        open={isProductFormOpen}
        onClose={() => setProductFormOpen(false)}
      />
    </main>
  );
}

export default App;
