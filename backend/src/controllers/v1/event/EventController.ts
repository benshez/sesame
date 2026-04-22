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

  CreateEventByTenenantAndUserId = async (req: SessionRequest, res: Response) => {
    try {
      const eventInfo = req.body.eventInfo;
      delete eventInfo.event_id;

      const event = await database
        .event(database.db)
        .insert(eventInfo);

      res.json(event)
    } catch (error) {
      console.log("Error creating event info: ", error);
      throw error;
    }
  }

  UpdateEventByTenenantAndUserId = async (req: SessionRequest, res: Response) => {
    try {

      const eventInfo = req.body.eventInfo;
      const eventId = eventInfo.event_id;
      delete eventInfo.event_id;

      const event = await database
        .event(database.db)
        .update(
          { 
            event_id: eventId 
          },
          {
            ...eventInfo
          });

      res.send(event);
    } catch (error) {
      console.log("Error updating event info: ", error);
      throw error;
    }
  }

  DeleteEventByTenenantAndUserId = async (req: SessionRequest, res: Response) => {
    try {
      const eventId = req.body.eventId;

      const event = await database
        .event(database.db)
        .update(
          {
            event_id: eventId
          },
          {
            active: false
          })

      res.json(event);
    } catch (error) {
      console.log("Error deleting event info: ", error);
      throw error;
    }
  }
}