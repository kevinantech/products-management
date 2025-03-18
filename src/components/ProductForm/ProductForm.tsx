import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextField } from "@mui/material";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductsContext } from "../../contexts/Products";
import { Product, ProductSchema } from "../../models/product";
import { Label } from "../ui/Label";
import styles from "./ProductForm.module.css";

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
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });
  const { products, handleCreate } = useContext(ProductsContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 3000);
    }
  }, [success]);

  const onSuccess = (data: Product) => {
    if (products?.some((p) => p.code === data.code)) {
      return setError("El código ya esta en uso");
    }
    if (error) setError("");
    if (!success) setSuccess(true);
    handleCreate(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    onSuccess,
    errors,
    error,
    success,
  };
};

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose }) => {
  const { register, handleSubmit, errors, onSuccess, error, success } =
    useProductForm();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute inset-0 bottom-auto m-auto my-10 w-max max-w-80 md:max-w-md p-6 rounded-lg bg-white">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-4 w-4" />
        </button>
        <div className="mt-5 mb-10">
          <h3 className="text-lg font-semibold">Agregar Nuevo Producto</h3>
          <p className="mt-1 text-sm text-gray-600">
            Complete los detalles del producto a continuación
          </p>
        </div>
        <form className="space-y-4 text-sm" onSubmit={handleSubmit(onSuccess)}>
          <div className="flex gap-2">
            <div>
              <Label htmlFor="code">Código *</Label>
              <TextField
                id="code"
                type="number"
                error={!!errors.code}
                helperText={errors.code?.message}
                {...register("code", {
                  setValueAs: (value) =>
                    !isNaN(value) && value > 0 ? Number(value) : undefined,
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
                  setValueAs: (value) =>
                    !isNaN(value) && value > 0 ? Number(value) : undefined,
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
              type="date"
              error={!!errors.createdAt}
              helperText={errors.createdAt?.message}
              {...register("createdAt")}
              fullWidth
            />
          </div>
          {!!error && (
            <p className="py-3 px-5 rounded-md bg-red-200 text-red-800">
              {error}
            </p>
          )}
          {!!success && (
            <p
              className={`${styles.success} py-3 px-5 rounded-md bg-green-200 text-green-800`}
            >
              Producto agregado correctamente
            </p>
          )}
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
