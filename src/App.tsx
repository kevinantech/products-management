import { Button, MenuItem, Select } from "@mui/material";
import { ArrowDownUp, Plus } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductForm } from "./components/ProductForm";
import { ProductsTable } from "./components/ProductsTable";
import { ProductsContext } from "./contexts/Products";
import { Filter, Sorting } from "./hooks/useProducts";
import { ProductView } from "./components/ProductView";

function App() {
  const {
    products,
    handleFilter,
    filter,
    handleSort,
    sort,
    product,
    handleCloseProductView,
  } = useContext(ProductsContext);
  const [isProductFormOpen, setProductFormOpen] = useState(false);
  const sortIconRef = useRef<SVGSVGElement>(null);

  // Añade interactivadad al boton de ordenar asc/desc
  useEffect(() => {
    let rotateFlag = false;
    if (sortIconRef.current) {
      const icon = sortIconRef.current;
      icon.addEventListener("click", () => {
        icon.style.transform = rotateFlag ? "" : "rotate(180deg)";
        rotateFlag = !rotateFlag;
      });
    }
  }, []);

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
          <nav className="flex gap-2 items-center justify-end mb-4">
            Ordenar por:
            <Select
              value={filter}
              defaultValue={Filter.CODE}
              onChange={handleFilter}
              size="small"
            >
              <MenuItem value={Filter.CODE}>Código</MenuItem>
              <MenuItem value={Filter.NAME}>Nombre</MenuItem>
              <MenuItem value={Filter.QUANTITY}>Cantidad</MenuItem>
              <MenuItem value={Filter.DATE}>Fecha</MenuItem>
            </Select>
            <button
              title={sort === Sorting.ASC ? "Ascendente" : "Descendente"}
              onClick={handleSort}
              className="p-2 rounded border border-gray-200 transition-colors duration-200 hover:bg-sky-50 hover:bg-opacity-75"
            >
              <ArrowDownUp
                ref={sortIconRef}
                className="h-4 w-4 transition-transform duration-150 ease-in-out"
              />
            </button>
          </nav>
          <ProductsTable />
        </div>
        <p className="pt-3 pb-6 px-6 text-sm text-gray-600 bg-sky-50 bg-opacity-75">
          Total de productos: {products.length}
        </p>
      </div>
      <ProductForm
        open={isProductFormOpen}
        onClose={() => setProductFormOpen(false)}
      />
      <ProductView
        open={!!product}
        onClose={handleCloseProductView}
        product={product}
      />
    </main>
  );
}

export default App;
