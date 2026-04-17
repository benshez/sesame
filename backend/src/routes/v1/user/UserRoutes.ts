import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing";
import { UserController } from "../../../controllers/v1";

class UserRoutes extends BaseRoute<UserController> {
  public baseUri = "v1/users";

  constructor() {
    super(new UserController());
  }

  protected RegisterRoutes(): void {
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


  public GetRouter(): Router {
    this.RegisterRoutes();
    return this.router;
  }

}

export default UserRoutes;
