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

    this
    .router
    .get("/get-user-metadata/:userId", verifySession(), async (req, res) => {
      return await this.controller.GetUserMetadata(req, res);
    })

    this
    .router
    .post("/update-user-metadata", verifySession(), async (req, res) => {
      return await this.controller.UpdateUserMetadata(req, res);
    })

    this
    .router
    .post("/add-role-to-user", verifySession(), async (req, res) => {
      return await this.controller.AddRoleToUser(req, res);
    })

    this
    .router
    .post("/update-user-email-password", verifySession(), async (req, res) => {
      return await this.controller.UpdateUserPaswordAndEmail(req, res);
    })
  }  
}

export default new UserRoutes().router;
