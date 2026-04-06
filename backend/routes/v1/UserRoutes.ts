import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { UserController } from "../../controllers";


class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.InitializeRoutes();
  }

  InitializeRoutes() {
    this
    .router
    .get("/get-user-info/:userId", verifySession(), async (req, res) => {
      return await this.controller.GetUserInfo(req, res);
    });
  }  
}

export default new UserRoutes().router;
