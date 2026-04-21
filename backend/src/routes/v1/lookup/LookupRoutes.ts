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

    this
      .router
      .get("/get-event-types", verifySession(), async (req, res) => {
        return await this.controller.GetEventTypes(req, res);
      });

    this
      .router
      .get("/get-venues", verifySession(), async (req, res) => {
        return await this.controller.GetVenues(req, res);
      });     
      
    this
      .router
      .get("/get-organizations", verifySession(), async (req, res) => {
        return await this.controller.GetOrganizations(req, res);
      });  
      
    this
      .router
      .get("/get-statuses", verifySession(), async (req, res) => {
        return await this.controller.GetEventStatuses(req, res);
      });       
  }
}

export default LookupRoutes;