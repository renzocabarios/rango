function base(val: string) {
  return new RegExp(`^${val}$`);
}

function notParam(val: string) {
  return `(?:\\/(${val}))`;
}

function isParam(val: string) {
  return `(?:\\/(?<${val}>[\\w\\-]+?))`;
}

function regex(url: string, full: boolean = false): RegExp | string {
  const pattern = url
    .split("/")
    .map((val) => (val.includes(":") ? isParam(val.substring(1)) : notParam(val)))
    .join("");

  return base(pattern);
}

export default regex;
