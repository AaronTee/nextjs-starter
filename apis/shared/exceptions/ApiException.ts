import { ApiErrorResponse } from "@apis/shared/types";
import { ApiExceptionCode } from "@apis/shared/constant";
import { HttpResponseContext } from "@apis/createHttp";

class ApiException extends Error {
  keycode: keyof typeof ApiExceptionCode;
  code: typeof ApiExceptionCode[keyof typeof ApiExceptionCode];
  message: string;
  statusCode: number;

  constructor(args: ApiErrorResponse & HttpResponseContext) {
    // if (environment.isDev || environment.isStaging) {
    //   super(`ApiErrorResponse: Details: ${JSON.stringify(args)}`);
    // } else {
    //   super(`ApiErrorResponse: Error Code: ${args.code}, Message: ${args.message}.`);
    // }

    super();

    this.keycode = args.keycode;
    this.code = args.code;
    this.message = args.message;
    this.statusCode = args.statusCode;
  }
}

export default ApiException;
