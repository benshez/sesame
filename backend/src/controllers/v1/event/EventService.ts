import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { ValidationError } from "../../../core/error";
import type Event from "../../../../../shared/interfaces/sesame_model_types/event";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { IEventService } from "./IEventService";
import { IEventRequest } from "./IEventRequest";


export class EventService implements IEventService {

  private database = useDatabase();

  async GetActiveItemsByTenantIdAndUserId(request: IEventRequest): Promise<Event[]> {
    const response = await this.database
      .event(this.database.db)
      .find(
        {
          tenant_id: request.baseRequest.tenantId,
          user_id: request.baseRequest.userId,
          active: true
        })
      .all();

    return response as unknown as Event[];
  }

  async CreateEventByTenenantAndUserId(request: IEventRequest): Promise<Event> {
    const eventInfo: Partial<Event> = request.event as unknown as Event;
    delete eventInfo.event_id;

    const response = await this.database
      .event(this.database.db)
      .insert(eventInfo as Event);

    return response as unknown as Event;
  }

  async UpdateEventById(request: IEventRequest, next: NextFunction): Promise<Event> {
    let eventId: number = 0;
    if (request.event && request.event.event_id) {
      eventId = request.event.event_id as unknown as number;
      if (eventId === 0 || !eventId) {
        next(new ValidationError({ code: 400, context: "Event Id is required" as unknown as undefined, logging: true }));
      }
    }
    const response = await this.database
      .event(this.database.db)
      .update(
        {
          event_id: eventId as unknown as number
        },
        {
          ...request.event
        });

    return response as unknown as Event;
  }

  async DeleteEventById(request: IEventRequest, next: NextFunction): Promise<Event> {
    let eventId: number = 0;
    if (request.event && request.event.event_id) {
      eventId = request.event.event_id as unknown as number;
      if (eventId === 0 || !eventId) {
        next(new ValidationError({ code: 400, context: "Event Id is required" as unknown as undefined, logging: true }));
      }
    }
    const response = await this.database
      .event(this.database.db)
      .update(
        {
          event_id: eventId
        },
        {
          active: false
        })

    return response as unknown as Event;
  }
}