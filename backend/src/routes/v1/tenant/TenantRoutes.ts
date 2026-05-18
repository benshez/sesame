import { BaseRoute } from "../../../core/routing";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { TenantController, TenantService, ITenantService } from "../../../controllers/v1";

class TenantRoutes extends BaseRoute<TenantController> {
  public baseUri = "v1/tenant";

  constructor() {
    const service: ITenantService = new TenantService();
    super(new TenantController(service));
  }

  protected RegisterRoutes(): void {
    this
      .router
      .get("/get-tenants", verifySession(), async (req, res, next) => {
        return await this.controller.GetTenants(req, res, next);
      });

    this
      .router
      .get("/get-tenant", verifySession(), async (req, res, next) => {
        return await this.controller.GetTenant(req, res, next);
      });

    this
      .router
      .get("/get-tenant-users", verifySession(), async (req, res, next) => {
        return await this.controller.GetUsersForTenant(req, res, next);
      });

    this
      .router
      .post("/create-tenant", verifySession(), async (req, res, next) => {
        return await this.controller.CreateTenant(req, res, next);
      });

    this
      .router
      .post("/add-user-to-tenant", verifySession(), async (req, res, next) => {
        return await this.controller.AddUserToTenant(req, res, next);
      });

    this
      .router
      .delete("/remove-user-to-tenant", verifySession(), async (req, res, next) => {
        return await this.controller.RemoveUserFromTenant(req, res, next);
      });
  }
}

export default TenantRoutes;