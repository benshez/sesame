import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { useDatabase } from "../../../core/db/query/useDatabase";

const database = useDatabase();

export class EventController extends BaseController {
  public Id: string = "EventController";

  GetActiveEventsByTenantIdAndUserId = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenantId = session!.getTenantId();
      const userId = session!.getUserId();

      const events = await database
        .event(database.db)
        .find(
          {
            tenant_id: tenantId,
            user_id: userId,
            active: true
          })
        .all();

      res.json(events);
    } catch (error) {
      console.log("Error fetching event info: ", error);
      throw error;
    }
  }
}