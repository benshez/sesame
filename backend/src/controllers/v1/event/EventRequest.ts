import type Event from "../../../core/db/sesame_model_types/event";
import type { IEvent } from "../../../../../shared/interfaces";
import { IControllerRequest } from "@/core/routing/IControllerRequest";

export class EventRequest implements IControllerRequest {

  CreateRequest(event: IEvent, userId: string, tenantId: string): Event {
    return {
      event_id: event.id as unknown as number,
      active: true,
      actual_attendance: 0,
      budget_estimated: "10",
      description: event.title,
      end_date: event.end as unknown as Date,
      locations: event.extendedProps?.locations,
      event_type_id: 1,
      organization_id: event.extendedProps?.organisationId as unknown as number,
      start_date: event.start,
      status_id: event.extendedProps?.calendar as unknown as number,
      tenant_id: tenantId,
      total_expenditure: "10",
      user_id: userId,
      venue_id: 1,
      estimated_attendance: 0
    };
  }
}