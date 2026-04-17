import { UserRoutes, EmailRoutes, SessionRoutes, LookupRoutes } from "../routes/v1";

export interface IRouteMapRoute {
  version: number,
  routes: object
}
interface IRouteMap {
  router: Array<IRouteMapRoute>
}

export const RouteRegistry: IRouteMap = {
  "router": [
    {
      "version": 1,
      "routes": {
        "users": () => {
          return new UserRoutes()
        },
        "email": () => {
          return new EmailRoutes()
        },
        "session": () => {
          return new SessionRoutes()
        },
        "lookup": () => {
          return new LookupRoutes()
        }
      }
    }
  ]
}