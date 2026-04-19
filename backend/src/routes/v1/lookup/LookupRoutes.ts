import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing"
import { LookupController } from "../../../controllers/v1";

class LookupRoutes extends BaseRoute<LookupController> {
  public baseUri = "v1/lookup";

  constructor() {
    super(new LookupController());
  }

  protected RegisterRoutes(): void {
    this
    .router
    .get("/get-countries", verifySession(), async (req, res) => {
      return await this.controller.GetCountries(req, res);
    });
  }
}

export default LookupRoutes;