import { UserRoutes, EmailRoutes, SessionRoutes, LookupRoutes } from "../../routes/v1";
import { IRouteMap } from "./";

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