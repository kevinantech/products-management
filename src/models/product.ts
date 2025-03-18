import { z } from "zod";

export type Product = z.infer<typeof ProductSchema>;

export const ProductSchema = z.object({
  code: z.number().min(1, "Ingrese un codigo valido"),
  name: z.string().min(3, "Ingrese un nombre"),
  description: z.string().min(3, "Ingrese una descripción"),
  quantity: z.number().min(1, "Ingrese la cantidad"),
  createdAt: z.string().min(1, "Ingrese una fecha"),
});
