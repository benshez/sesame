import { ref } from "vue";
import { defineStore } from "pinia";
import type { IEvent } from "@/interfaces";
import { ApiClient } from "@/plugins";
import { useUserStore } from "@/store";
import { useLocalStorage } from "@vueuse/core";
import type Event from "../../../../shared/interfaces/sesame_model_types/event";

export const useEventStore = defineStore("events", () => {
  const apiClient = new ApiClient();
  const eventState = ref(([] as Array<IEvent>));

  const GetAccessToken = async () => {
    const userStore = useUserStore();
    return await userStore.GetAccessToken();
  }

  const GetUserId = async () => {
    const userStore = useUserStore();
    return await userStore.GetUserId();
  }

  const SetupEvent = (event: IEvent) => {
    const eventInfo = {
      active: true,
      actual_attendance: null,
      budget_estimated: null,
      description: event.title,
      end_date: event.end,
      estimated_attendance: null,
      event_id: event.id as unknown as number,
      event_type_id: 1,
      locations: event.extendedProps?.locations,
      organization_id: event.extendedProps?.organisationId,
      start_date: event.start,
      status_id: event.extendedProps?.calendar,
      tenant_id: "1",
      total_expenditure: null,
      user_id: "",
      venue_id: "1"
    } as unknown as Event

    return eventInfo
  }

  const GetEventStatusById = async (id: string) => {
    const statuses: Array<any> = await apiClient
      .setBearerAuth(await GetAccessToken())
      .lookup()
      .eventStatuses() as unknown as Array<unknown>;

    let statusName = "";

    statuses.find((status) => {
      if (status.status_id === id) statusName = status.name;
    });

    return statusName;
  }

  const GetEvents = async () => {
    eventState.value = [];
    const event: IEvent = {

    } as unknown as IEvent;

    const events: Array<Event> = await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .getActiveEventsByTenantIdAndUserId(SetupEvent(event)) as unknown as Array<Event>;

    events.forEach((event: Event) => {
      eventState.value.push(
        {
          id: event.event_id.toString(),
          start: event.start_date,
          end: event.end_date,
          title: event.description?.toString() || "",
          extendedProps: {
            calendar: event.status_id.toString(),
            organisationId: event.organization_id,
            locations: event.locations,
          }
        }
      )
    })
  }

  const GetEventByEventId = (eventId: string): IEvent => {
    return eventState.value.filter(e => e.id.toString() === eventId)[0] as unknown as IEvent;
  }

  const CreateEvent = async (event: IEvent, tenantId: string) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .createTenenatAndUserEvent(SetupEvent(event));

    await GetEvents();
  }

  const UpdateEvent = async (event: IEvent, tenantId: string) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .updateTenenatAndUserEvent(SetupEvent(event));

    await GetEvents();
  }

  const DeleteEvent = async (eventId: string) => {
    const event: IEvent = {
      id: eventId
    } as unknown as IEvent;

    await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .deleteTenenatAndUserEvent(SetupEvent(event));

    await GetEvents();
  }

  return {
    eventState,
    SetupEvent,
    GetEvents,
    GetEventByEventId,
    CreateEvent,
    UpdateEvent,
    DeleteEvent,
    GetEventStatusById
  }
})