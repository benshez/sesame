import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing"
import { EventController } from "../../../controllers/v1";

class EventRoutes extends BaseRoute<EventController> {
  public baseUri = "v1/event";

  constructor() {
    super(new EventController());
  }

  protected RegisterRoutes(): void {
    this
      .router
      .get("/get-events",verifySession(), async (req, res) => {
        return await this.controller.GetEvents(req, res);
      });
  }
}

export default EventRoutes;