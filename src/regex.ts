function base(val: string) {
  return new RegExp(`^${val}$`);
}

function notParam(val: string) {
  return `(?:\\/(${val}))`;
}

function isParam(val: string) {
  return `(?:\\/(?<${val}>[\\w\\-]+?))`;
}

function paramMapper(val: string) {
  return val.includes(":") ? isParam(val.substring(1)) : notParam(val);
}

function regex(url: string, full: boolean = false): RegExp | string {
  return full ? base(url) : url.split("/").map(paramMapper).join("");
}

export default regex;
