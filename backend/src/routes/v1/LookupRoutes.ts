import { Router } from "express";
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { LookupController } from "../../controllers";


class LookupRoutes {
  router = Router();
  controller = new LookupController();

  constructor() {
    this.InitializeRoutes();
  }

  InitializeRoutes() {
    this
    .router
    .get("/get-countries", async (req, res) => {
      return await this.controller.GetCountries(req, res);
    });
  }
}

export default new LookupRoutes().router;