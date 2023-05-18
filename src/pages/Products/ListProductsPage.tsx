import { Box, useToast } from "@chakra-ui/react";
import { ProductsTable } from "../../components/Products/ProductsTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProductApiReponse } from "../../types/Products";
import { useProductsApi } from "../../api/hooks/useProductsApi";
import { ProductsHeader } from "../../components/Products/ProductsHeader";
import { DeleteProductModal } from "../../components/Products/DeleteProductModal";
import { SubmitHandler } from "react-hook-form";
import { deleteProductsSchema } from "./schemas/deleteProductSchema";

export const ListProductsPage = () => {
  const { getProducts, deleteProduct } = useProductsApi();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState<IProductApiReponse>(
    {} as IProductApiReponse
  );

  const { data, isLoading, isFetching, isError } = useQuery(
    ["products-list", { currentPage }],
    () => getProducts({ page: currentPage }),
    { retry: 3, staleTime: 1 * 1000 * 60, keepPreviousData: true }
  );

  if (isError)
    toast({
      position: "top",
      title: "Erro ao buscar produtos",
      status: "error",
      duration: 4000,
      isClosable: true,
    });

  const handleEdit = (product: IProductApiReponse) =>
    navigate("/product/edit", { state: product });

  const handleDeleteModal = (product: IProductApiReponse) => {
    setProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const deleteProductMutation = useMutation(
    async (productId: number) => {
      const response = await deleteProduct(productId);
      return response;
    },
    {
      onError: () => {
        toast({
          position: "top",
          title: "Ocorreu um erro ao excluir o produto!",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        toast({
          position: "top",
          title: "Excluido com sucesso!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        queryClient.invalidateQueries(["products-list"]);
        setShowDeleteModal(false);
      },
    }
  );

  const handleDeleteProduct: SubmitHandler<deleteProductsSchema> = (data) => {
    deleteProductMutation.mutate(data.id);
  };

  return (
    <Box
      flex="1"
      borderRadius={8}
      bgGradient="linear(to-r, gray.900, gray.800)"
      px={["2.5", "8"]}
      py={["6", "8"]}
      mb="5"
    >
      <ProductsHeader />

      {showDeleteModal && (
        <DeleteProductModal
          isOpen={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          product={product}
          handleSubmit={() => handleDeleteProduct(product)}
        />
      )}

      {isLoading || isFetching ? (
        <Loading isOpen={isLoading || isFetching} />
      ) : null}

      {data ? (
        <ProductsTable
          products={data?.data}
          handleEdit={handleEdit}
          handleDelete={handleDeleteModal}
        />
      ) : null}
      {data?.total ? (
        <Pagination
          total={data?.total}
          currentPage={currentPage}
          itemDescription="produtos encontrados"
          onPageChange={setCurrentPage}
        />
      ) : null}
    </Box>
  );
};
