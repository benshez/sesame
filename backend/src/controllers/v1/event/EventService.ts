import type Event from "../../../core/db/sesame_model_types/event";
import { IEvent } from "../../../../../shared/interfaces";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { EventResponse } from "./EventResponse";
import { IEventService } from "./IEventService";

export class EventService implements IEventService {

  private database = useDatabase();

  async GetActiveItemsByTenantIdAndUserId(userId: string, tenantId: string): Promise<IEvent[]> {

    const events = await this.database
      .event(this.database.db)
      .find(
        {
          tenant_id: tenantId,
          user_id: userId,
          active: true
        })
      .all();

    return EventResponse.CreateArrayResponse(events) as unknown as IEvent[];
  }

  async CreateEventByTenenantAndUserId(event: Event): Promise<IEvent> {

    const response = await this.database
      .event(this.database.db)
      .insert(event);

    return EventResponse.CreateArrayResponse(response) as unknown as IEvent;
  }

  async UpdateEventById(event: Event, eventId: number): Promise<IEvent> {

    const response = await this.database
      .event(this.database.db)
      .update(
        {
          event_id: eventId
        },
        {
          ...event
        });

    return EventResponse.CreateArrayResponse(response) as unknown as IEvent;
  }

  async DeleteEventById(eventId: number): Promise<IEvent> {

    const response = await this.database
      .event(this.database.db)
      .update(
        {
          event_id: eventId
        },
        {
          active: false
        })

    return EventResponse.CreateArrayResponse(response) as unknown as IEvent;
  }
}