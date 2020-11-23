import { AxiosRequestConfig, AxiosResponse } from "axios";

export type RequestInterceptorCallback = {
  onFullfilled: (axiosRequestConfig: AxiosRequestConfig) => any;
  onRejected: (err: any) => any;
};

export type ResponseInterceptorCallback = {
  onFullfilled: (
    value: AxiosResponse<any>
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
  onRejected: (err: any) => any;
};

export type DefaultRequestInterceptor = RequestInterceptorCallback;

export type AuthRequestInterceptor = (config: {
  token;
  headers;
}) => RequestInterceptorCallback;

export type DefaultResponseInterceptor = ResponseInterceptorCallback;
