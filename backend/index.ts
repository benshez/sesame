import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
//import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./config";
//import Multitenancy from "supertokens-node/recipe/multitenancy";
import { useBackendConfig } from "./config/useBackendConfig";
import { UserRoutes, EmailRoutes, SessionRoutes } from "./routes";

supertokens.init(SuperTokensConfig);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: useBackendConfig().GetWebsiteDomain(),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());


// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
  res.send("hello");
});

// // An example API that requires session verification
// app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
//   const session = req.session;
//   res.send({
//     sessionHandle: session!.getHandle(),
//     userId: session!.getUserId(),
//     accessTokenPayload: session!.getAccessTokenPayload(),
//     tenantId: session!.getTenantId()
//   });
// });

// // This API is used by the frontend to create the tenants drop down when the app loads.
// // Depending on your UX, you can remove this API.
// app.get("/tenants", async (_req, res) => {
//   const tenants = await Multitenancy.listAllTenants();
//   res.send(tenants);
// });

app
  .use("/session", SessionRoutes)
  .use("/users", UserRoutes)
  .use("/emails", EmailRoutes);


// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());


app.listen(3001, () => {
  console.log(`API Server listening on port ${useBackendConfig().GetApiDomain()} || 3001`);
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
