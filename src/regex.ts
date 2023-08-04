function base(val: string) {
  return new RegExp(`^${val}$`);
}

function regex(url: string, full: boolean = false): RegExp | string {
  const notParam = (val: string) => `(?:\\/(${val}))`;
  const isParam = (val: string) => `(?:\\/(?<${val}>[\\w\\-]+?))`;
  const pattern = url
    .split("/")
    .map((val) => (val.includes(":") ? isParam(val.substring(1)) : notParam(val)))
    .join("");

  return base(pattern);
}

export default regex;
