import type Event from "../../../core/db/sesame_model_types/event";
import type { IEvent } from "../../../../../shared/interfaces";

export class EventRequest  {

  public request: Event = {} as Event;

  CreateRequest(event: IEvent, userId: string, tenantId: string): Event {
    this.request.active = true;
    this.request.actual_attendance = 0;
    this.request.budget_estimated = "10";
    this.request.event_type_id = 1;
    this.request.tenant_id = tenantId;
    this.request.total_expenditure = "10";
    this.request.user_id = userId;
    this.request.venue_id = 1;
    this.request.estimated_attendance = 0;


    if (event.id) {
      this.request.event_id = parseInt(event.id);
    }
    if (event.title) {
      this.request.description = event.title;
    }
    if (event.end) {
      this.request.end_date = event.end as unknown as Date;
    }
    if (event.start) {
      this.request.start_date = event.start;
    }
    if (event.extendedProps) {
      if (event.extendedProps.locations) this.request.locations = event.extendedProps.locations;
      if (event.extendedProps.organisationId) this.request.organization_id = event.extendedProps.organisationId as unknown as number;
      if (event.extendedProps.calendar) this.request.status_id = event.extendedProps.calendar as unknown as number;
    }

    return this.request;
  }
}