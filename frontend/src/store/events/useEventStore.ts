import { ref } from "vue";
import { defineStore } from "pinia";
import type { IEvent } from "@/interfaces";
import { ApiClient } from "@/plugins";
import { useUserStore } from "@/store";
import { useLocalStorage } from "@vueuse/core";

export const useEventStore = defineStore("events", () => {
  const apiClient = new ApiClient();
  const eventState = ref(useLocalStorage("sesame.event.state", [] as Array<IEvent>));

  const GetAccessToken = async () => {
    const userStore = useUserStore();
    return await userStore.GetAccessToken();
  }

  const GetUserId = async () => {
    const userStore = useUserStore();
    return await userStore.GetUserId();
  }

  const SetupEvent = async (event: IEvent, tenantId: string) => {
    return {
      event_id: event.id,
      active: true,
      actual_attendance: 0,
      budget_estimated: "10",
      description: event.title,
      end_date: event.end,
      locations: event.extendedProps?.locations,
      event_type_id: 1,
      organization_id: event.extendedProps?.organisationId,
      start_date: event.start,
      status_id: event.extendedProps?.calendar,
      tenant_id: tenantId,
      total_expenditure: "10",
      user_id: await GetUserId(),
      venue_id: 1
    }
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

    const events: Array<IEvent> = await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .getActiveEventsByTenantIdAndUserId() as unknown as Array<IEvent>;

      eventState.value = events as Array<IEvent>;
  }

  const GetEventByEventId = (eventId: string): IEvent => {
    return eventState.value.filter(e => e.id.toString() === eventId)[0] as unknown as IEvent;
  }

  const CreateEvent = async (event: IEvent, tenantId: string) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .createTenenatAndUserEvent(await SetupEvent(event, tenantId));

    await GetEvents();
  }

  const UpdateEvent = async (event: IEvent, tenantId: string) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .updateTenenatAndUserEvent(await SetupEvent(event, tenantId));

    await GetEvents();
  }

  const DeleteEvent = async (eventId: string) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .events()
      .deleteTenenatAndUserEvent(eventId);

    await GetEvents();
  }

  return {
    eventState,
    GetEvents,
    GetEventByEventId,
    CreateEvent,
    UpdateEvent,
    DeleteEvent,
    GetEventStatusById
  }
})