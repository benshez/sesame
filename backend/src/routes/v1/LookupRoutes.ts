import { BaseRoute } from "../../core/routing"
import { LookupController } from "../../controllers";

class LookupRoutes extends BaseRoute<LookupController> {
  public baseUri = "v1/lookup";

  constructor() {
    super(new LookupController());
  }

  protected RegisterRoutes(): void {
    this
    .router
    .get("/get-countries", async (req, res) => {
      return await this.controller.GetCountries(req, res);
    });
  }
}

export default LookupRoutes;