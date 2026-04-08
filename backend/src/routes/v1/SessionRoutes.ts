import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionController } from "../../controllers";


class SessionRoutes {
  router = Router();
  controller = new SessionController();

  constructor() {
    this.InitializeRoutes();
  }

  InitializeRoutes() {
    this
    .router
    .get("/info", verifySession(), async (req, res) => {
      return await this.controller.GetSessionInfo(req, res);
    });
  }  
}

export default new SessionRoutes().router;
