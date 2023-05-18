import { GridItem, useToast } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { ICreateOrEditProduct, productSchema } from "./schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomNumberInput } from "../../components/Form/CustomNumberInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrEditProduct } from "../../components/Products/CreateOrEditProduct/CreateOrEditProduct";
import { useProductsApi } from "../../api/hooks/useProductsApi";

export const AddProductPage = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { createProduct } = useProductsApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICreateOrEditProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: undefined,
      stockQuantity: undefined,
    },
  });

  const createProductMutation = useMutation(
    async (data: ICreateOrEditProduct) => {
      const { name, price, stockQuantity } = data;

      const response = await createProduct({ name, price, stockQuantity });
      return response;
    },
    {
      onError: () => {
        toast({
          position: "top",
          title: "Esse produto já está cadastrado!",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      },
      onSuccess: (res) => {
        toast({
          position: "top",
          title: res.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        queryClient.invalidateQueries(["products-list"]);
        reset();
      },
    }
  );

  const onSubmit: SubmitHandler<ICreateOrEditProduct> = async (data) => {
    createProductMutation.mutate(data);
  };

  return (
    <CreateOrEditProduct
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      headerTitle="Cadastrar produto"
      btnText="SALVAR"
    >
      <GridItem colSpan={[1, 3]} rowSpan={1}>
        <Input
          inputName="name"
          size="md"
          type="text"
          label="Nome do produto"
          placeholder="Nome do produto"
          error={errors.name}
          {...register("name")}
        />
      </GridItem>
      <GridItem colSpan={1} rowSpan={1}>
        <CustomNumberInput
          label="Preço do produto"
          prefix="R$"
          error={errors.price}
          placeholder="00,00"
          {...register("price")}
        />
      </GridItem>

      <GridItem colSpan={[1, 2]} rowSpan={1}>
        <CustomNumberInput
          label="Estoque"
          prefix="UNI"
          placeholder="00"
          error={errors.stockQuantity}
          {...register("stockQuantity")}
        />
      </GridItem>
    </CreateOrEditProduct>
  );
};
