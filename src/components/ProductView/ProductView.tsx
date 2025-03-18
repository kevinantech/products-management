import { Dialog } from "@mui/material";
import { X } from "lucide-react";
import { Product } from "../../models/product";
import { format } from "../../utils/format-date";

export type ProductViewProps = {
  open: boolean;
  onClose: () => void;
  product?: Product;
};

const ProductView: React.FC<ProductViewProps> = ({
  open,
  onClose,
  product,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="[&_div.MuiPaper-root]:rounded-lg"
    >
      <div className="w-72 sm:min-w-[25rem] relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-4 w-4" />
        </button>
        <h1 className="mb-5 text-xl font-medium">Detalles del Producto</h1>
        <div className="py-4 mb-5">
          <div className="grid grid-cols-[120px_1fr] gap-y-4">
            <div className="font-medium text-neutral-500">Código:</div>
            <div>{product?.code}</div>

            <div className="font-medium text-neutral-500">Nombre:</div>
            <div>{product?.name}</div>

            <div className="font-medium text-neutral-500">Descripción:</div>
            <div>{product?.description}</div>

            <div className="font-medium text-neutral-500">Cantidad:</div>
            <div>{product?.quantity}</div>

            <div className="font-medium text-neutral-500">Creación:</div>
            <div>{product ? format(product.createdAt) : ""}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-md border border-gray-200 text-sm transition-colors duration-150 ease-in-out font-medium hover:bg-sky-50 hover:bg-opacity-75"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductView;
