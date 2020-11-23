import { ApiExceptionCode } from "@apis/shared/constant";
import ApiException from "@apis/shared/exceptions/ApiException";
import CancelledException from "@apis/shared/exceptions/CancelledException";
import { ApiResponse } from "@apis/shared/types";
import { getKeyByValue } from "@utils/object";
import axios, { AxiosResponse } from "axios";

export const defaultResponseInterceptor = {
  onFullfilled: (resp: AxiosResponse<ApiResponse<any>>) => {
    resp.data = resp.data.data;
    return resp;
  },
  onRejected: (err: any) => {
    // alert(JSON.stringify(err.message) + "detail: " + JSON.stringify(err));

    if (err.message === "Network Error") {
      return Promise.reject(err);
    }

    if (axios.isCancel(err)) {
      const cancelledException = new CancelledException({
        handlerName: "Axios",
        reason: err.message,
      });
      return Promise.reject(cancelledException);
    }

    const errorResponse = err.response;

    if (errorResponse && errorResponse.status) {
      const status: number = err.response.status;

      switch (status) {
        case 401: {
          // dispatch(signout("sessionExpired"));
        }
      }
    }

    const handledError = errorResponse.data && errorResponse.data.error;

    if (!handledError) {
      return Promise.reject(err);
    }

    const apiException = new ApiException({
      keycode: getKeyByValue(ApiExceptionCode, handledError.code),
      code: handledError.code,
      message: handledError.msg,
      statusCode: errorResponse.status,
    });

    return Promise.reject(apiException);
  },
};
