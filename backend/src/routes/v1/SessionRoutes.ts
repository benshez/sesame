import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../core";
import { SessionController } from "../../controllers";

class SessionRoutes extends BaseRoute<SessionController> {
  public baseUri = "v1/session";

  constructor() {
    super(new SessionController());
  }

  protected RegisterRoutes(): void {
    this
    .router
    .get("/info", verifySession(), async (req, res) => {
      return await this.controller.GetSessionInfo(req, res);
    });
  }  
}

export default SessionRoutes;
