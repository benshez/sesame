import { BaseRoute } from "../../../core/routing";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { TenantController } from "../../../controllers/v1";

class TenantRoutes extends BaseRoute<TenantController> {
  public baseUri = "v1/tenants";

  constructor() {
    super(new TenantController());
  }

  protected RegisterRoutes(): void {
    this
    .router
    .get("/get-tenants", verifySession(), async (req, res) => {
      return await this.controller.GetTenants(req, res);
    });

  }  
}

export default TenantRoutes;