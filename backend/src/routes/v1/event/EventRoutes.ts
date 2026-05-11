import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing"
import { 
  EventController, 
  EventService, 
  IEventService 
} from "../../../controllers/v1";

class EventRoutes extends BaseRoute<EventController> {
  public baseUri = "v1/event";

  constructor() {
    const service: IEventService = new EventService();
    super(new EventController(service));
  }

  protected RegisterRoutes(): void {
    this
      .router
      .get("/get-active-user-events", verifySession(), async (req, res, next) => {
        return await this.controller.GetActiveEventsByTenantIdAndUserId(req, res, next);
      });

    this
      .router
      .post("/create-tenant-user-event", verifySession(), async (req, res, next) => {
        return await this.controller.CreateEventByTenenantAndUserId(req, res, next);
      });

    this
      .router
      .post("/update-tenant-user-event", verifySession(), async (req, res, next) => {
        return await this.controller.UpdateEventByTenenantAndUserId(req, res, next);
      });

    this
      .router
      .patch("/delete-tenenat-user-event", verifySession(), async (req, res, next) => {
        return await this.controller.DeleteEventByTenenantAndUserId(req, res, next);
      })
  }
}

export default EventRoutes;