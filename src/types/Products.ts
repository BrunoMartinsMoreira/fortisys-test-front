import { FindAllBase } from "./FindAllBase";

export interface IProductApiReponse {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
}

export interface IFindAllProducts extends FindAllBase {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
}
