import type Event from "../../../core/db/sesame_model_types/event";
import type { IEvent } from "../../../../../shared/interfaces";

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
          calendar: event.status_id.toString(),
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
}