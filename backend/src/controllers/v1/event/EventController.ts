import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { BadRequestError } from "../../../core/error"

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
      if(!eventId || eventId === "") {
        throw new BadRequestError({ code: 400, message: "EventId is required!", logging: true });
      }
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

      return res.status(200).json(event);
    } catch (error: unknown) {
      throw new BadRequestError({ message: "Name is required!", logging: true, context: error as undefined });
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