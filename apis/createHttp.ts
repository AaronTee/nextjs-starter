import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { defaultRequestInterceptor } from "./interceptors/request";
import {
  DefaultRequestInterceptor,
  DefaultResponseInterceptor,
} from "./interceptors/types";
import { defaultResponseInterceptor } from "./interceptors/response";

interface GetRequest {
  relPath: string;
  queryParam?: object;
  axiosRequestConfig?: AxiosRequestConfig;
}

interface PostRequest<TRequestBody> {
  relPath: string;
  queryParam?: object;
  requestBody?: TRequestBody;
  axiosRequestConfig?: AxiosRequestConfig;
}

export interface HttpResponseContext {
  statusCode: number;
}

interface AxiosRequest extends Omit<AxiosInstance, "get" | "post"> {
  get: <TResponse = any>(request: GetRequest) => Promise<TResponse>;
  post: <TRequestBody = any, TResponse = any>(
    request: PostRequest<TRequestBody>
  ) => Promise<TResponse>;
}

// Set your defaults here
axios.defaults.withCredentials = true;

interface CreateHttp {
  <RIC>(
    baseUrl: string,
    onCreated: (cancelToken: CancelTokenSource) => void,
    requestInterceptorConfig?: RIC,
    requestInterceptor?: (config: RIC) => DefaultRequestInterceptor,
    responseInterceptor?: DefaultResponseInterceptor
  ): AxiosRequest;
}

const createHttp: CreateHttp = (
  baseUrl,
  onCreated,
  requestInterceptorConfig,
  requestInterceptor = defaultRequestInterceptor,
  responseInterceptor = defaultResponseInterceptor
) => {
  const axiosInst = axios.create({
    baseURL: baseUrl,
    headers: {
      // Global header
    },
  });

  // Abstract get and post method to enhance the request process to our application
  const getFn = axiosInst.get;
  const postFn = axiosInst.post;

  const instance = (axiosInst as any) as AxiosRequest;

  instance.get = async function (request) {
    const cancelSource: CancelTokenSource = axios.CancelToken.source();
    onCreated && onCreated(cancelSource);

    const response = await getFn(request.relPath, {
      params: request.queryParam,
      cancelToken: cancelSource.token,
      ...request.axiosRequestConfig,
    });

    return response.data;
  };

  instance.post = async function (request) {
    const cancelSource: CancelTokenSource = axios.CancelToken.source();
    onCreated && onCreated(cancelSource);

    const response = await postFn(request.relPath, request.requestBody, {
      params: request.queryParam,
      ...request.axiosRequestConfig,
    });

    return response.data;
  };

  // interceptors
  const {
    onFullfilled: onRequestFullfilled,
    onRejected: onRequestRejected,
  } = requestInterceptor(requestInterceptorConfig);

  const {
    onFullfilled: onResponseFullfilled,
    onRejected: onResponseRejected,
  } = responseInterceptor;

  instance.interceptors.request.use(onRequestFullfilled, onRequestRejected);
  instance.interceptors.response.use(onResponseFullfilled, onResponseRejected);

  return instance as AxiosRequest;
};

export default createHttp;
