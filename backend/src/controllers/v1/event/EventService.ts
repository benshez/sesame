import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { ValidationError } from "../../../core/error";
import type Event from "../../../../../shared/interfaces/sesame_model_types/event";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { IEventService, EventResponse } from "./";
import { IEventRequest } from "./IEventRequest";
import { IEvent } from "../../../../../shared/interfaces";


export class EventService implements IEventService {

  private database = useDatabase();

  async GetActiveItemsByTenantIdAndUserId(request: IEventRequest): Promise<IEvent[]> {
    const events = await this.database
      .event(this.database.db)
      .find(
        {
          tenant_id: request.baseRequest.tenantId,
          user_id: request.baseRequest.userId,
          active: true
        })
      .all();

    const response = EventResponse.CreateArrayResponse(events)

    return response as unknown as IEvent[];
  }

  async CreateEventByTenenantAndUserId(request: IEventRequest): Promise<IEvent> {
    const eventInfo: Partial<Event> = EventResponse.FromIEventToEventResponse(request);
    delete eventInfo.event_id;

    const response = await this.database
      .event(this.database.db)
      .insert(eventInfo as Event);

    return response as unknown as IEvent;
  }

  async UpdateEventById(request: IEventRequest, next: NextFunction): Promise<IEvent> {
    let eventId: number = 0;
    if (request.event && request.event.id) {
      eventId = request.event.id as unknown as number;
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
          ...EventResponse.FromIEventToEventResponse(request)
        });

    return response as unknown as IEvent;
  }

  async DeleteEventById(request: IEventRequest, next: NextFunction): Promise<IEvent> {
    let eventId: number = 0;
    if (request.event && request.event.id) {
      eventId = request.event.id as unknown as number;
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

    return response as unknown as IEvent;
  }
}