import { defineStore } from "pinia";
import type { IEvent } from "@/interfaces";
import { ApiClient } from "@/plugins";
import { useUserStore } from "@/store";

const apiClient = new ApiClient();

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    eventState: [] as Array<IEvent>,
  }),
  actions: {
    async GetAccessToken() {
      const userStore = useUserStore();
      return await userStore.GetAccessToken();
    },

    async GetUserId() {
      const userStore = useUserStore();
      return await userStore.GetUserId();
    },

    async SetupEvent(event: IEvent, tenantId: string) {
      return {
        event_id: event.id,
        active: true,
        actual_attendance: 0,
        budget_estimated: "10",
        description: event.title,
        end_date: event.end,
        estimated_attendance: 0,
        event_type_id: 1,
        organization_id: 1,
        start_date: event.start,
        status_id: event.extendedProps?.calendar,
        tenant_id: tenantId,
        total_expenditure: "10",
        user_id: await this.GetUserId(),
        venue_id: 1
      }
    },

    async GetEventStatusById(id: string) {
      const statuses: Array<any> = await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .lookup()
        .eventStatuses() as unknown as Array<unknown>;

      let statusName = "";

      statuses.find((status) => {
        if (status.status_id === id) statusName = status.name;
      });

      return statusName;
    },

    async GetEvents() {
      this.$state.eventState = [];
      
      const events: Array<unknown> = await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .events()
        .getActiveEventsByTenantIdAndUserId() as unknown as unknown[];

      events.forEach(async (event: any) => {

        const e: IEvent = {
          id: event.event_id,
          start: event.start_date,
          end: event.end_date,
          title: event.description,
          extendedProps: {
            calendar: event.status_id
          }
        }

        this.$state.eventState.push(e);
      })
    },

    async CreateEvent(event: IEvent, tenantId: string) {
      await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .events()
        .createTenenatAndUserEvent(await this.SetupEvent(event, tenantId));

      this.GetEvents();
    },

    async UpdateEvent(event: IEvent, tenantId: string) {
      await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .events()
        .updateTenenatAndUserEvent(await this.SetupEvent(event, tenantId));

      this.GetEvents();
    },

    async DeleteEvent(eventId: string) {
      await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .events()
        .deleteTenenatAndUserEvent(eventId);

      this.GetEvents();
    }
  },
  getters: {
    loaderShowing: (state) => state.eventState,
  }
})