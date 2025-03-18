import { Eye, Trash2 } from "lucide-react";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/Products";
import { format } from "../../utils/format-date";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/Table";

const cut = (str: string) =>
  str.length > 15 ? `${str.substring(0, 20).trim()}...` : str.trim();

export type ProductsTableProps = {};

const ProductsTable: React.FC<ProductsTableProps> = () => {
  const { products, handleDelete, handleProductView } =
    useContext(ProductsContext);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell># Código</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Fecha de creación</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((product) => (
            <TableRow key={product.code}>
              <TableCell># {product.code}</TableCell>
              <TableCell title={product.name}>{cut(product.name)}</TableCell>
              <TableCell title={product.description}>
                {cut(product.description)}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{format(product.createdAt)}</TableCell>
              <TableCell className="flex gap-2">
                <button
                  title="Ver mas"
                  onClick={() => handleProductView(product)}
                  className="p-2 rounded-lg transition-colors duration-150 ease-in-out hover:bg-blue-200"
                >
                  <Eye className="h-4 w-4 text-blue-400" />
                </button>
                <button
                  title="Eliminar"
                  onClick={() => handleDelete(product.code)}
                  className="p-2 rounded-lg transition-colors duration-150 ease-in-out hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
