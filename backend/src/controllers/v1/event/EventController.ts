import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { BadRequestError, ValidationError } from "../../../core/error"
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";

const database = useDatabase();

export class EventController extends BaseController {
  public Id: string = "EventController";

  GetActiveEventsByTenantIdAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
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

      res.status(200).json(events);
    } catch (error) {
      next(new BadRequestError({ message: `Error fetching event info ${error}`, logging: true }));
    }
  }

  CreateEventByTenenantAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const eventInfo = req.body.eventInfo;
      delete eventInfo.event_id;

      const event = await database
        .event(database.db)
        .insert(eventInfo);

      res.status(200).json(event)
    } catch (error) {
      next(new BadRequestError({ message: `Error creating event info ${error}`, logging: true }));
    }
  }

  UpdateEventByTenenantAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {

      const eventInfo = req.body.eventInfo;
      const eventId = eventInfo.event_id;
      if (!eventId || eventId === "") {
        next(new ValidationError({ code: 400, context: "Event Id is required" as unknown as undefined, logging: true }));
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

      res.status(200).json(event);
    } catch (error: unknown) {
      next(new BadRequestError({ context: `Error updating event info ${error}` as unknown as undefined, logging: true }))
    }
  }

  DeleteEventByTenenantAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const eventId = req.body.eventId;
      if (!eventId || eventId === "") {
        next(new ValidationError({ code: 400, context: "Event Id is required" as unknown as undefined, logging: true }));
      }
      const event = await database
        .event(database.db)
        .update(
          {
            event_id: eventId
          },
          {
            active: false
          })

      res.status(200).json(event);
    } catch (error) {
      next(new BadRequestError({ context: `Error deleting event info ${error}` as unknown as undefined, logging: true }));
    }
  }
}