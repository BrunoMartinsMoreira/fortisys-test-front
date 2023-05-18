import * as zod from "zod";

export const productSchema = zod
  .object({
    name: zod
      .string({ required_error: "Informe o nome do produto" })
      .min(1, { message: "Informe o nome do produto" }),

    price: zod
      .string({ required_error: "Informe o preço do produto" })
      .min(1, { message: "Informe o preço do produto" }),

    stockQuantity: zod
      .string({
        required_error: "Informe a quantidade em estoque",
      })
      .min(1, { message: "Informe a quantidade em estoque" }),
  })
  .refine((data) => parseFloat(data.price))
  .refine((data) => parseFloat(data.stockQuantity));

export type ICreateOrEditProduct = zod.infer<typeof productSchema>;
