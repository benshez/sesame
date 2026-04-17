import { Express } from "express";
import { type IRouteMapRoute, RouteRegistry } from "./";

export class RouteLoader {
  constructor(private app: Express) { }

  public Load(versions: Array<number> = [1]) {

    versions.forEach((version) => {
      const router: IRouteMapRoute = RouteRegistry.router.find((routes: IRouteMapRoute) => {
        if (routes.version === version) return routes as IRouteMapRoute;
        return {};
      }) as unknown as IRouteMapRoute


      Object.values(router.routes).forEach((route) => {
        const instance = route();

        this
          .app
          .use(`/api/${instance.baseUri}`, instance.router);
      })
    })
  }
}