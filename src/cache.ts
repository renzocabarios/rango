import { RouteObject } from "./interfaces";

interface CacheRoute extends Omit<RouteObject, "regex"> {
  regex: RegExp;
}

const cache: Map<RegExp, CacheRoute>[] = [];

function add(route: CacheRoute) {
  const index = route.path.split("/").length;

  if (!cache[index]) {
    cache[index] = new Map();
  }

  cache[index].set(route.regex, route);
}

function get(path: string): { route: CacheRoute; params: { [x: string]: string } } | null {
  let matched = null;
  let cacheRoute: CacheRoute | undefined;
  const index = path.split("/").length;

  if (!cache[index]) return null;

  for (const key of cache[index].keys()) {
    matched = key.exec("/" + path);

    if (matched) {
      cacheRoute = cache[index].get(key);
      break;
    }
  }

  return cacheRoute ? { route: cacheRoute, params: matched?.groups ?? {} } : null;
}

export default { add, get };
