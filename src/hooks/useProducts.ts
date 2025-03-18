import { SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";
import { Product } from "../models/product";

export enum Sorting {
  ASC = "asc",
  DESC = "desc",
}

export enum Filter {
  CODE = "code",
  NAME = "name",
  QUANTITY = "quantity",
  DATE = "date",
}

const dateCast = (date: string) => new Date(date).getTime();

/**
 * Custom hook para el manejo estado de los productos.
 */
export const useProducts = () => {
  const [_product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.CODE);
  const [sort, setSort] = useState<Sorting>(Sorting.DESC);

  const _products = useMemo(() => {
    const _new = [...products];

    switch (filter) {
      case Filter.CODE: {
        if (sort === Sorting.ASC) _new.sort((a, b) => a.code - b.code);
        else _new.sort((a, b) => b.code - a.code);
        break;
      }
      case Filter.NAME: {
        if (sort === Sorting.ASC) _new.sort();
        else _new.sort().reverse();
        break;
      }
      case Filter.QUANTITY: {
        if (sort === Sorting.ASC) _new.sort((a, b) => a.quantity - b.quantity);
        else _new.sort((a, b) => b.quantity - a.quantity);
        break;
      }
      case Filter.DATE: {
        if (sort === Sorting.ASC) {
          _new.sort((a, b) => dateCast(a.createdAt) - dateCast(b.createdAt));
        } else {
          _new.sort((a, b) => dateCast(b.createdAt) - dateCast(a.createdAt));
        }
        break;
      }
      default:
        break;
    }

    return _new;
  }, [products, sort, filter]);

  const handleCreate = (body: Product) => {
    setProducts((prev) => [body, ...prev]);
  };

  const handleDelete = (code: number) => {
    setProducts((prev) => prev.filter((p) => p.code !== code));
  };

  const handleFilter = (e: SelectChangeEvent) => {
    setFilter(e.target.value as Filter);
  };

  const handleSort = () => {
    setSort(sort === Sorting.ASC ? Sorting.DESC : Sorting.ASC);
  };

  const handleProductView = (product: Product) => setProduct(product);
  const handleCloseProductView = () => {
    if (_product) setProduct(undefined);
  };

  return {
    products: _products,
    product: _product,
    filter,
    sort,
    handleCreate,
    handleDelete,
    handleFilter,
    handleSort,
    handleProductView,
    handleCloseProductView,
  };
};
