import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Product, ProductSchema } from "../../models/product";
import { ProductsContext } from "../../contexts/Products";
import { useContext } from "react";
import { X } from "lucide-react";

export type ProductFormProps = {
  open: boolean;
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
  const { handleCreate } = useContext(ProductsContext);

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

const ProductForm: React.FC<ProductFormProps> = ({ open }) => {
  const { register, handleSubmit, errors, onSuccess } = useProductForm();

  return (
    <Modal open={open} className="relative">
      <div className="absolute inset-0 bottom-auto m-auto mt-20 w-max space-y-4 p-6 rounded-lg bg-white">
        <button className="absolute top-4 right-4 ">
          <X className="h-4 w-4" />
        </button>
        <div>
          <h3 className="text-lg font-semibold">Agregar Nuevo Producto</h3>
          <p className="mt-1 text-sm text-gray-600">
            Complete los detalles del producto a continuación
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSuccess)}>
          <div className="flex gap-2">
            <TextField
              label="Codigo *"
              type="number"
              {...register("code", {
                setValueAs: (value) => (isNaN(value) ? 0 : Number(value)),
              })}
            />
            <TextField
              label="Cantidad *"
              type="number"
              {...register("quantity", {
                setValueAs: (value) => (isNaN(value) ? 0 : Number(value)),
              })}
            />
          </div>
          <TextField label="Nombre *" {...register("name")} fullWidth />
          <TextField
            label="Descripción *"
            {...register("description")}
            fullWidth
          />
        </form>
      </div>
    </Modal>
  );
};

export default ProductForm;
