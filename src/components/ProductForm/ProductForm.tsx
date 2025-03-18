import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Product, ProductSchema } from "../../models/product";
import { ProductsContext } from "../../contexts/Products";
import { useContext } from "react";
import { X } from "lucide-react";
import { Label } from "../ui/Label";

export type ProductFormProps = {
  open: boolean;
  onClose: () => void;
};

const useProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });
  const { handleCreate } = useContext(ProductsContext);

  console.log({
    code: watch("code"),
    quantity: watch("quantity"),
  });

  const onSuccess = (data: Product) => {
    handleCreate(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    onSuccess,
    errors,
  };
};

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose }) => {
  const { register, handleSubmit, errors, onSuccess } = useProductForm();

  return (
    <Modal open={open} onClose={onClose} className="relative">
      <div className="absolute inset-0 bottom-auto m-auto mt-20 w-max max-w-80 md:max-w-md space-y-4 p-6 rounded-lg bg-white">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-4 w-4" />
        </button>
        <div>
          <h3 className="text-lg font-semibold">Agregar Nuevo Producto</h3>
          <p className="mt-1 text-sm text-gray-600">
            Complete los detalles del producto a continuación
          </p>
        </div>
        <form className="space-y-4 text-sm" onSubmit={handleSubmit(onSuccess)}>
          <div className="flex gap-2">
            <div>
              <Label htmlFor="code">Codigo *</Label>
              <TextField
                id="code"
                type="number"
                error={!!errors.code}
                helperText={errors.code?.message}
                {...register("code", {
                  setValueAs: (value) => (isNaN(value) ? 0 : Number(value)),
                })}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Cantidad *</Label>
              <TextField
                id="quantity"
                type="number"
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                {...register("quantity", {
                  setValueAs: (value) => (isNaN(value) ? 0 : Number(value)),
                })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="name">Nombre *</Label>
            <TextField
              id="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
              fullWidth
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción *</Label>
            <TextField
              id="description"
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
              fullWidth
            />
          </div>
          <div>
            <Label htmlFor="description">Creación *</Label>
            <TextField
              id="createdAt"
              error={!!errors.createdAt}
              helperText={errors.createdAt?.message}
              {...register("createdAt")}
              fullWidth
            />
          </div>
          <div className="flex justify-end">
            <Button className="mt-8" type="submit">
              Guardar Producto
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductForm;
