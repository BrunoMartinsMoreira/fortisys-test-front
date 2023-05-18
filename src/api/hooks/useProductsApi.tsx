import { ICreateOrEditProduct } from "../../pages/Products/schemas/productSchema";
import { IApiResponse } from "../../types/ApiResponse";
import { Pagination } from "../../types/Pagination";
import { IFindAllProducts, IProductApiReponse } from "../../types/Products";
import { api } from "../baseApi";

export const useProductsApi = () => {
  const getProducts = async (
    params?: IFindAllProducts
  ): Promise<Pagination<IProductApiReponse>> => {
    const { data } = await api.get("/products", {
      params: {
        page: params?.page,
        perPage: params?.perPage ?? 10,
        name: params?.name,
        minPrice: params?.minPrice,
        maxPrice: params?.maxPrice,
        minQuantity: params?.maxQuantity,
        maxQuantity: params?.maxQuantity,
      },
    });

    return data;
  };

  const getProductById = async (
    id: number
  ): Promise<IApiResponse<IProductApiReponse>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  };

  const createProduct = async ({
    name,
    price,
    stockQuantity,
  }: ICreateOrEditProduct): Promise<IApiResponse<IProductApiReponse>> => {
    const response = await api.post("/products", {
      name,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
    });

    return response.data;
  };

  const editProduct = async (
    data: ICreateOrEditProduct,
    productId: number
  ): Promise<IApiResponse<IProductApiReponse>> => {
    const response = await api.patch(`/products/${productId}`, {
      name: data.name,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
    });

    return response.data;
  };

  const deleteProduct = async (
    id: number
  ): Promise<IApiResponse<IProductApiReponse>> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  };

  return {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
  };
};
