import type Event from "../../../../../shared/interfaces/sesame_model_types/event";
import type { IEvent } from "../../../../../shared/interfaces";
import { IEventRequest } from "./IEventRequest";

export class EventResponse {

  private static arrayResponse: Array<IEvent> = [] as Array<IEvent>;
  private static response: IEvent = {} as IEvent;

  static CreateArrayResponse(events: Array<Event>): Array<IEvent> {
    this.arrayResponse = [];

    events.forEach((event) => {
      this.arrayResponse.push({
        id: event.event_id.toString(),
        start: event.start_date,
        end: event.end_date,
        title: event.description?.toString() || "",
        extendedProps: {
          calendar: event.status_id as unknown as number,
          organisationId: event.organization_id,
          locations: event.locations,
        }
      });
    });

    return this.arrayResponse;
  }

  static CreateResponse(event: Event): IEvent {

    this.response.id = event.event_id.toString();
    this.response.start = event.start_date;
    this.response.end = event.end_date;
    this.response.title = event.description?.toString() || "";
    this.response.extendedProps = {
      calendar: event.status_id.toString(),
      organisationId: event.organization_id,
      locations: event.locations,
    };

    return this.response;
  }

  static FromIEventToEventResponse = (request: IEventRequest): Event => {
    const response = {} as Event;

    response.active = true;
    response.actual_attendance = null;
    response.budget_estimated = null;
    response.description = request.event?.title as unknown as string;
    response.end_date = request.event?.end as unknown as Date;
    response.estimated_attendance = null;
    response.event_id = request.event?.id as unknown as number;
    response.event_type_id = 1;
    response.locations = request.event?.extendedProps?.locations;
    response.organization_id = request.event?.extendedProps?.organisationId as unknown as number;
    response.start_date = request.event?.start  as unknown as Date;
    response.status_id = request.event?.extendedProps?.calendar as unknown as number;
    response.tenant_id = request.baseRequest.tenantId;
    response.total_expenditure = null;
    response.user_id = request.baseRequest.userId;
    response.venue_id = 1;

    return response;
  }
}