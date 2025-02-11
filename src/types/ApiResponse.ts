import { Pagination } from "./PaginationType";

export interface ApiResponse<T> {
  data: T;
  message: string;
  page?: Pagination;
}
