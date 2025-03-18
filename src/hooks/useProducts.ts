import { useState } from "react";
import { Product } from "../models/product";
export type Filter = "code" | "name" | "quantity" | "date";
export type Sorting = "asc" | "desc";

/**
 * Custom hook para el manejo estado de los productos.
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>("code");
  const [sort, setSort] = useState<Sorting>("asc");

  const handleCreate = (body: Product) => {
    setProducts((prev) => [body, ...prev]);
  };

  const handleDelete = (code: number) => {
    setProducts((prev) => prev.filter((p) => p.code !== code));
  };

  const handleFilter = (filter: Filter) => setFilter(filter);
  const handleSort = (sort: Sorting) => setSort(sort);

  return {
    products,
    filter,
    sort,
    handleCreate,
    handleDelete,
    handleFilter,
    handleSort,
  };
};
