import type Event from "../../../core/db/sesame_model_types/event";
import { IEvent } from "../../../../../shared/interfaces";

export interface IEventService {
  GetActiveItemsByTenantIdAndUserId(userId: string, tenantId: string): Promise<IEvent[]>;
  CreateEventByTenenantAndUserId(event: Event): Promise<IEvent>;
  UpdateEventById(event: Event, eventId: number): Promise<IEvent>;
  DeleteEventById(eventId: number): Promise<IEvent>;
}