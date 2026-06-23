import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing";
import { FormBuilderController, IFormBuilderService, FormBuilderService } from "../../../controllers/v1";

class FormBuilderRoutes extends BaseRoute<FormBuilderController> {
  public baseUri = "v1/formbuilder";

  constructor() {
    const service: IFormBuilderService = new FormBuilderService();
    super(new FormBuilderController(service));
  }

  protected RegisterRoutes(): void {
    this
      .router
      .get("/read-tenant-json/:version", verifySession(), async (req, res, next) => {
        return await this.controller.ReadTenantJson(req, res, next);
      });

    this
      .router
      .post("/write-tenant-json", verifySession(), async (req, res, next) => {
        return await this.controller.WriteTenantJson(req, res, next);
      });
  }
}

export default FormBuilderRoutes;