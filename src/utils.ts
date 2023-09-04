import { ResponseObject } from "./interfaces";
import Os from "os";

export function statusCodeFactory(res: ResponseObject) {
  return (code: number) => {
    res.status(code);
  };
}

/**
 * Determine whether the Node.js process runs on Windows.
 *
 * @returns {Boolean}
 */
export function isWindows() {
  return Os.platform() === "win32";
}

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
