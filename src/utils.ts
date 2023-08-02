import { ResponseObject } from "./interfaces";

export function statusCodeFactory(res: ResponseObject) {
  return (code: number) => {
    res.status(code);
  };
}

export const pathUrl = (url: string) => url.replace(/(^\/+)|(\/+$)/g, "");
