import { ResponseObject } from "./interfaces";

export function statusCodeFactory(res: ResponseObject) {
  return (code: number) => {
    res.status(code);
  };
}

export const pathUrl = (url: string) => url.replace(/(^\/+)|(\/+$)/g, "");

export const parseParams = (params: { [x: string]: string }) => {
  let parsed: { [x: string]: string | number | boolean } = {};

  Object.keys(params).forEach((param) => {
    const value = params[param];

    if (!isNaN(+value)) {
      parsed[param] = +value;
      return;
    }

    if (value === "true" || value === "false") {
      parsed[param] = value === "true";
      return;
    }

    parsed[param] = value;
  });

  return parsed;
};
