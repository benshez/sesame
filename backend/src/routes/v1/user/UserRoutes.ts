import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing";
import { IUserService, UserController, UserService } from "../../../controllers/v1";

class UserRoutes extends BaseRoute<UserController> {
  public baseUri = "v1/users";

  constructor() {
    const service: IUserService = new UserService();
    super(new UserController(service));
  }

  protected RegisterRoutes(): void {
    this
      .router
      .get("/get-user-info/:userId", verifySession(), async (req, res, next) => {
        return await this.controller.GetUserInfo(req, res, next);
      });

    this
      .router
      .get("/get-user-metadata/:userId", verifySession(), async (req, res, next) => {
        return await this.controller.GetUserMetadata(req, res, next);
      })

    this
      .router
      .post("/update-user-metadata", verifySession(), async (req, res, next) => {
        return await this.controller.UpdateUserMetadata(req, res, next);
      })

    this
      .router
      .post("/add-role-to-user", verifySession(), async (req, res, next) => {
        return await this.controller.AddRoleToUser(req, res, next);
      })

    this
      .router
      .post("/update-user-email-password", verifySession(), async (req, res, next) => {
        return await this.controller.UpdateUserPasswordAndEmail(req, res, next);
      })
  }


  public GetRouter(): Router {
    this.RegisterRoutes();
    return this.router;
  }

}

export default UserRoutes;
