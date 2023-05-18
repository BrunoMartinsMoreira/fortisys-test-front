export type Pagination<T> = {
  total: number;
  perPage: number;
  data: T[];
  message: string[];
};
