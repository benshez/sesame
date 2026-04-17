import { BaseRoute } from "../../../core/routing";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { CalendarController } from "../../../controllers/v1";

class CalendarRoutes extends BaseRoute<CalendarController> {
  public baseUri = "v1/email";

  constructor() {
    super(new CalendarController());
  }

  protected RegisterRoutes(): void {
    this
    .router
    .get("/verify-email", async (req, res) => {
      return await this.controller.GetCalenderItems(req, res);
    });

    this
    .router
    .put("/get-calendar-items", verifySession(), async (req, res) => {
      return await this.controller.CreateCalenderItem(req, res);
    });
    
    this
    .router
    .put("/un-verify-email",async (req, res) => {
      return await this.controller.UpdateCalenderItem(req, res);
    });

    this
    .router
    .delete("/un-verify-email",async (req, res) => {
      return await this.controller.DeleteCalenderItem(req, res);
    })    
  }  
}

export default CalendarRoutes;