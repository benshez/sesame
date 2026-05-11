import type Event from "../../../core/db/sesame_model_types/event";
import type { IEvent } from "../../../../../shared/interfaces";
import { IControllerResponse } from "@/core/routing/IControllerResponse";

export class EventResponse implements IControllerResponse {

  GetResponse(events: Array<Event>): Array<IEvent>  {
    const response: Array<IEvent> = [];

    events.forEach((event) => {
      response.push({
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

    return response;
  }
}