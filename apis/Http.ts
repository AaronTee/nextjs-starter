import { getLocalStoreItem } from "@stores/local";
import createHttp from "./createHttp";
import { CancelTokenSource } from "axios";
import nextConfig from "next/config";

const { publicRuntimeConfig } = nextConfig();
const _baseUrl = publicRuntimeConfig.apis.baseUrl;

type CancelReason =
  | "Component Unmounted"
  | "Clean Up / Concurrent Call"
  | "By User"
  | "Exception";

export interface HttpClass {
  new (): Http;
}

export default class Http {
  protected http: ReturnType<typeof createHttp>;
  protected cancelToken: CancelTokenSource;

  constructor(args?: { baseUrl: undefined }) {
    this.http = createHttp(
      (args && args.baseUrl) || _baseUrl,
      (CancellationToken) => {
        this.cancelToken = CancellationToken;
      }
    );
  }

  /* Call it whenever component is unmounting */
  cancelAllRequest = (reason: CancelReason = undefined) => {
    if (!this.cancelToken) {
      return;
    }

    this.cancelToken.cancel(
      `API call was cancelled. Reason: ${reason || "Unspecified"}.`
    );
  };
}
