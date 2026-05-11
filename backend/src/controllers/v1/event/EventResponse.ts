import type Event from "../../../core/db/sesame_model_types/event";
import type { IEvent } from "../../../../../shared/interfaces";

export class EventResponse {

  public static response: Array<IEvent> = [] as Array<IEvent>;

  static CreateResponse(events: Array<Event>): Array<IEvent> {

    events.forEach((event) => {
      this.response.push({
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

    return this.response;
  }
}