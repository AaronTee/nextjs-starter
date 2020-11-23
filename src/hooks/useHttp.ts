import Http, { HttpClass } from "@apis/Http";
import { useCallback, useEffect, useRef } from "react";
import SWR, { responseInterface } from "swr";

interface useHttpDefinition {
  <HttpInst extends HttpClass>(inst: HttpInst): [
    InstanceType<HttpInst>,
    <TResponse = any>(
      fetcher: (api: InstanceType<HttpInst>) => Promise<TResponse>,
      key?: string
    ) => responseInterface<TResponse, any>
  ];
}

const useHttp: useHttpDefinition = <HttpInst extends HttpClass>(
  Inst: HttpInst
) => {
  const api = useRef(new Inst());

  const useSWR = <TResponse = any>(
    fetcher: (api: InstanceType<HttpInst>) => Promise<TResponse>,
    key?: string
  ) => {
    return SWR(
      `${Inst.name}/${fetcher.name}?${key}`,
      async () => await fetcher(api.current as InstanceType<HttpInst>)
    );
  };

  useEffect(() => {
    api.current.cancelAllRequest("Component Unmounted");
  }, []);

  return [api.current as InstanceType<HttpInst>, useSWR];
};

export default useHttp;
