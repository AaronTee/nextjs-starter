import { ApiExceptionCode } from "./constant";

export interface ApiErrorResponse {
  keycode: keyof typeof ApiExceptionCode;
  code: typeof ApiExceptionCode[keyof typeof ApiExceptionCode];
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  error: ApiErrorResponse;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export interface Sort {
  field: string;
  orderBy: "ASC" | "DESC";
}
