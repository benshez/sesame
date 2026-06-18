import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
//import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { middleware } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./src/config/config";
//import Multitenancy from "supertokens-node/recipe/multitenancy";
import { useBackendConfig } from "./src/config/useBackendConfig";
import { RouteLoader } from "./src/core/routing";
import { errorHandler } from "./src/core/error";
import { xss } from "express-xss-sanitizer";
import "express-async-errors";

supertokens.init(SuperTokensConfig);
const config = useBackendConfig();
const app = express();


app.use(
  cors({
    origin: config.GetWebsiteDomain(),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders(), "x-api-key"],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const authenticateApiKey = (request: SessionRequest, response: Response, next: NextFunction) => {
  const authKey = request.headers["authorization"];
  const apiKey = request.headers["x-api-key"];

  if (authKey !== undefined) {
    if (!apiKey || config.GetApiKey() !== apiKey) {
      return response
        .status(401)
        .json({ error: "Invalid or missing API key" });
    }
  }

  return next();
}
//app.use(express.json());
app.use(authenticateApiKey, express.json());

app.use(xss());
// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());


// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
  res.send("hello");
});

// // This API is used by the frontend to create the tenants drop down when the app loads.
// // Depending on your UX, you can remove this API.
// app.get("/tenants", async (_req, res) => {
//   const tenants = await Multitenancy.listAllTenants();
//   res.send(tenants);
// });

const Loader = new RouteLoader(app);
Loader.Load();

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler);

app.listen(3001, () => {
  //console.log(`API Server listening on port ${useBackendConfig().GetApiDomain()} || 3001`);
  // const routes = [];
  // let route;
  // app._router.stack.forEach(function (middleware: any) {
  //   if (middleware.route) { // routes registered directly on the app
  //     routes.push(middleware.route);
  //   } else if (middleware.name === 'router') { // router middleware 
  //     middleware.handle.stack.forEach(function (handler: any) {
  //       route = handler.route;
  //       //route && 
  //       routes.push(route);
  //     });
  //   }
  // });

  // console.log("Available Routes:");
  // routes.forEach((r: any) => {
  //   const methods = Object.keys(r.methods).join(", ").toUpperCase();
  //   console.log(`${methods} ${r.path}`);
  // });
});
