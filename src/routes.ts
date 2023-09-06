import { RequestMethod, RoutePromiseCallback, RouteMethodObjectCallback, Middlewares, Route } from "./types";
import {
  CreateRoute,
  BaseRoute,
  RouteEndpoint,
  RouteObject,
  RouteWithController,
  Controller,
  RouteWithMiddleware,
  RouteWithChildren,
} from "./interfaces";
import RegEx from "./regex";
import constants from "./constants";

const routes = new Map<string, RouteObject>();

function createRouteMapper(route: Route, isChild: any = false): RouteObject {
  if (route.path.charAt(0) !== "/" && !isChild) {
    route.path = route.path.padStart(route.path.length + 1, "/");
  }

  const paths = route.path.split("/");
  return mapRoutePaths(paths, route, routes);
}

function mapRoutePaths(paths: string[], route: BaseRoute, parent: Map<string, RouteObject>): RouteObject {
  const hasMorePaths = paths.length > 1;
  const path = paths.shift() as string;
  const routeObj: RouteObject = createRouteObject({ path }, parent);

  if (!hasMorePaths) {
    updateEndpoints(route, routeObj);
    updateMiddlewares(route as RouteWithMiddleware, routeObj);
    updateChildren(route as RouteWithChildren, routeObj);
  }

  const controller: Controller | undefined = (route as RouteWithController)?.controller;

  if (!hasMorePaths && controller && controller.routes.length > 0) {
    controller.routes.forEach((item) => {
      if (item.path === "/") {
        updateEndpoints(item, routeObj);
        updateMiddlewares(item as RouteWithMiddleware, routeObj);
        updateChildren(item as RouteWithChildren, routeObj);
        return;
      }

      const childRouteObj = mapRoutePaths(item.path.replace("/", "").split("/"), item, routeObj.children);
      routeObj.children.set(childRouteObj.path, childRouteObj);
    });
  }

  if (hasMorePaths) {
    const childRouteObj = mapRoutePaths(paths, route, routeObj.children);
    routeObj.children.set(childRouteObj.path, childRouteObj);
  }

  parent.set(routeObj.path, routeObj);
  return routeObj;
}

function updateMiddlewares(route: RouteWithMiddleware, currentRoute: RouteObject) {
  const middlewares: Middlewares = route?.middlewares !== undefined ? route.middlewares : [];
  currentRoute.middlewares = [...currentRoute.middlewares, ...middlewares];
}

function updateEndpoints(route: BaseRoute, routeObject: RouteObject) {
  const routeKeys = Object.keys(route) as RequestMethod[];
  const hasRouteMethods = routeKeys.some((e: any) => constants.REQUEST_METHODS.includes(e));

  if (hasRouteMethods) {
    routeKeys.forEach(mapEndpoints(route, routeObject));
  }
}

function updateChildren(route: RouteWithChildren, currentRoute: RouteObject) {
  if (route?.children && route.children.length > 0) {
    route.children.forEach(mapRouteChildren(currentRoute));
  }
}

function mapRouteChildren(currentRoute: RouteObject) {
  return (childRoute: BaseRoute) => {
    childRoute.path = childRoute.path.replace("/", "");
    const childRouteObj = createRouteMapper(childRoute, true);
    currentRoute.children.set(childRouteObj.path, childRouteObj);
  };
}

function mapEndpoints(route: Route, routeObject: RouteObject) {
  return (method: RequestMethod): RouteEndpoint | null => {
    if (constants.REQUEST_METHODS.includes(method)) {
      const callback =
        (route[method] as RouteMethodObjectCallback)?.callback ?? (route[method] as RoutePromiseCallback);
      const middlewares = (route[method] as RouteMethodObjectCallback)?.middlewares ?? [];
      routeObject.endpoints.push({ method, callback, middlewares });
    }

    return null;
  };
}

function createRouteObject(route: CreateRoute): RouteObject;
function createRouteObject(path: string, parent: Map<string, RouteObject>): RouteObject;
function createRouteObject(route: CreateRoute, parent: Map<string, RouteObject>): RouteObject;
function createRouteObject(route: CreateRoute | string, parent?: Map<string, RouteObject>): RouteObject {
  const isString = typeof route === "string";
  const routePath = isString ? route : route.path;
  const isExist = parent?.get(routePath);

  if (isExist || (isString && isExist)) return isExist;

  const { path, endpoints = [], middlewares = [], children = new Map<string, RouteObject>() } = route as CreateRoute;
  return { regex: RegEx(path), path, hasParam: path.includes(":"), endpoints, middlewares, children };
}

function checkRoutePathExist(pathname: string): RouteObject | undefined {
  const paths = pathname.split("/");
  let middlewares: Middlewares = [];
  let routeObj: RouteObject | undefined = undefined;
  let path = "";

  // See https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/#arrayforeach-vs-for-and-forof
  // Why we use for-of instead of map, forEach or reduce
  for (const value of paths) {
    const prevPath = path;

    routeObj = !!routeObj ? checkRouteChildrenPathExist(routeObj.children, value) : routes.get(value);

    if (routeObj !== undefined) {
      middlewares = [...middlewares, ...(routeObj.middlewares ?? [])];
      path = path.length > 0 ? [prevPath, routeObj.path].join("/") : routeObj.path;
    }
  }

  if (!routeObj) return;

  return createRouteObject({ path, middlewares, endpoints: [...routeObj.endpoints] });
}

function checkRouteChildrenPathExist(children: Map<string, RouteObject>, path: string) {
  let routeObj: RouteObject | undefined = children.get(path);

  if (routeObj) return routeObj;

  for (const child of children.values()) {
    if (child.hasParam) {
      routeObj = child;
      break;
    }
  }

  return routeObj;
}

function checkEndpointExist(routeObj: RouteObject, method: RequestMethod): RouteEndpoint | undefined {
  let endpoint: RouteEndpoint | undefined = undefined;

  routeObj.endpoints.some((e) => {
    const isExist = e.method === method;

    if (isExist) endpoint = e;

    return isExist;
  });

  return endpoint;
}

export { createRouteMapper, checkRoutePathExist, checkEndpointExist };
