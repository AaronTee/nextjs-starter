import { AxiosRequestConfig } from "axios";

export const defaultRequestInterceptor = (config: any) => ({
  onFullfilled: (axiosRequestConfig: AxiosRequestConfig) => {
    if (axiosRequestConfig.method.toUpperCase() === "POST") {
      axiosRequestConfig.data = axiosRequestConfig.data || {};
    }

    return axiosRequestConfig;
  },
  onRejected: (err) => {
    return Promise.reject(err);
  },
});

export const authRequestInterceptor = (config: any) => ({
  onFullfilled: (axiosRequestConfig) => {
    let headers = {
      ...axiosRequestConfig.headers,
      ...config.headers,
    };

    if (!!config.token) {
      headers = {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      };
    }

    axiosRequestConfig.headers = headers;

    if (axiosRequestConfig.method.toUpperCase() === "POST") {
      axiosRequestConfig.data = axiosRequestConfig.data || {};
    }

    return axiosRequestConfig;
  },
  onRejected: (err) => {
    return Promise.reject(err);
  },
});
