import { GridItem, useToast } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { ICreateOrEditProduct, productSchema } from "./schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomNumberInput } from "../../components/Form/CustomNumberInput";
import { useLocation, useNavigate } from "react-router-dom";
import { IProductApiReponse } from "../../types/Products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrEditProduct } from "../../components/Products/CreateOrEditProduct/CreateOrEditProduct";
import { useProductsApi } from "../../api/hooks/useProductsApi";

export const EditProductPage = () => {
  const toast = useToast();
  const location = useLocation();
  const { editProduct } = useProductsApi();
  const navigate = useNavigate();

  const product = location.state as IProductApiReponse;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICreateOrEditProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
    },
  });

  const editProductMutation = useMutation(
    async (data: ICreateOrEditProduct) => {
      const { name, price, stockQuantity } = data;

      const response = await editProduct(
        { name, price, stockQuantity },

        product.id
      );
      return response;
    },
    {
      onError: () => {
        toast({
          position: "top",
          title: "Ocorreu um erro ao editar o produto!",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      },
      onSuccess: (data) => {
        toast({
          position: "top",
          title: data.message[0],
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        queryClient.invalidateQueries(["products-list"]);
        reset();
        navigate("/");
      },
    }
  );

  const onSubmit: SubmitHandler<ICreateOrEditProduct> = async (data) => {
    editProductMutation.mutate(data);
  };

  return (
    <CreateOrEditProduct
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      headerTitle="Editar produto"
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
          placeholder="00,00"
          error={errors.price}
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
