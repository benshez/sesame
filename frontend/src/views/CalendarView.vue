<template>
  <BaseLayout>

    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="overflow-hidden rounded-2xl border col-span-12 custom-calendar">
        <FullCalendar ref="calendarRef" class="min-h-screen" :options="calendarOptions" />
      </div>
    </div>

    <Modal v-if="isOpen" @close="closeModal">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h5 class="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            {{ selectedEvent ? "Edit Event" : "Add Event" }}
          </h5>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Plan your next big moment: schedule or edit an event to stay on track
          </p>

          <div class="mt-8">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Title
              </label>
              <input v-model="eventTitle" type="text"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
            </div>

            <div class="mt-6">
              <label class="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Color
              </label>
              <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                <div v-for="(status, key) in statuses" :key="key" class="n-chk">
                  <div :class="`form-check form-check-${status.value} form-check-inline`">
                    <label class="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                      :for="`modal${status.key}`">
                      <span class="relative">
                        <input type="radio" :name="'event-level'" :value="status.key" :id="`modal${status.key}`"
                          v-model="eventLevel" class="sr-only form-check-input" />
                        <span
                          class="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                          <span class="w-2 h-2 bg-white rounded-full dark:bg-transparent"></span>
                        </span>
                      </span>
                      {{ status.value }}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter Start Date
              </label>
              <input v-model="eventStartDate" type="date"
                class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
            </div>

            <div class="mt-6">
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter End Date
              </label>
              <input v-model="eventEndDate" type="date"
                class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
            </div>
          </div>

          <div class="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button @click="closeModal"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Close
            </button>

            <button @click="handleAddOrUpdateEvent"
              class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              {{ selectedEvent ? "Update Changes" : "Add Event" }}
            </button>
            <button v-if="selectedEvent" @click="handleDeleteEvent"
              class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
              Delete Event
            </button>
          </div>
        </div>
      </template>
    </Modal>

  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import FullCalendar from "@fullcalendar/vue3";
import type { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTime } from "ts-luxon";
import Modal from "@/components/profile/Modal.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useEventStore } from "@/store";
import type { IEvent, IStatus } from "@/interfaces";
import { ApiClient } from "@/plugins";


const apiClient = new ApiClient();
const calenderStore = useEventStore();
const route = useRoute();
const router = useRouter();
const calendarRef = ref(null);
const isOpen = ref(false);
const selectedEvent = ref<IEvent>();
const eventTitle = ref("");
const eventStartDate = ref<Date>();
const eventEndDate = ref<Date>();
const eventLevel = ref<number>();
const statuses = ref<Array<IStatus>>([]);

const handleAddOrUpdateEvent = async () => {
  const event: IEvent = {
    id: "",
    title: eventTitle.value,
    start: eventStartDate.value as unknown as string,
    end: eventEndDate.value as unknown as string,
    extendedProps: { calendar: eventLevel.value as unknown as string },
  }
  if (selectedEvent.value) {
    event.id = selectedEvent.value.id as unknown as string;

    await calenderStore.UpdateEvent(
      event,
      route.params.tenantId as string
    )
  } else {
    await calenderStore.CreateEvent(
      event,
      route.params.tenantId as string
    )
  }
  calendarOptions.events = calenderStore.eventState as unknown as Array<IEvent>;
  closeModal();
}

const handleDeleteEvent = async () => {
  if (selectedEvent.value) {
    await calenderStore.DeleteEvent(selectedEvent.value.id);
    calendarOptions.events = calenderStore.eventState as unknown as Array<IEvent>;
    closeModal()
  }
}

const closeModal = () => {
  isOpen.value = false;
  resetModalFields();
}

const resetModalFields = () => {
  eventTitle.value = "";
  eventStartDate.value = DateTime.local().setZone("Australia/Brisbane").toISO()?.split("T")[0] as unknown as Date;
  eventEndDate.value = DateTime.local().setZone("Australia/Brisbane").toISO()?.split("T")[0] as unknown as Date;
  eventLevel.value = 0;
  selectedEvent.value = undefined;
}

const handleDateSelect = (selectInfo: any) => {
  resetModalFields()
  eventStartDate.value = selectInfo.startStr
  eventEndDate.value = selectInfo.endStr || selectInfo.startStr
  openModal(selectInfo.id)
}

const handleEventClick = (clickInfo: any) => {
  const event = clickInfo.event;
  selectedEvent.value = event
  eventTitle.value = event.title
  eventStartDate.value = event.startStr.split("T")[0] as Date
  if (event.end) {
    eventEndDate.value = event.endStr.split("T")[0] as Date
  }
  eventLevel.value = event.extendedProps.calendar
  openModal(event.id)
}

const renderEventContent = (eventInfo: any) => {
  const timeText = eventInfo.timeText;
  const event = eventInfo.event;
  let status = "Danger";
  statuses.value.filter((e) => { 
    if(e.key === event.extendedProps.calendar) status = e.value
  }) as unknown as string;

  const colorClass = `fc-bg-${status.toLowerCase()}`;

  return {
    html: `
      <div class="event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm">
        <div class="fc-daygrid-event-dot"></div>
        <div class="fc-event-time">${timeText}</div>
        <div class="fc-event-title">${event.title}</div>
      </div>
    `,
  }
}

const openModal = (eventId: string = "new") => {
  //if(typeof eventId === "object") eventId = "new"
  router.push(`/map/${route.params.tenantId}/${route.params.userId}/${eventId}`)
  //isOpen.value = true;
}

const calendarOptions: CalendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next addEventButton",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  events: [{}],
  selectable: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventContent: "",
  customButtons: {
    addEventButton: {
      text: "Add Event +",
      click: openModal,
    },
  },
}) as unknown as CalendarOptions;

onBeforeMount(async () => {
  await calenderStore.GetEvents();
  calendarOptions.events = calenderStore.eventState as unknown as Array<IEvent>;

  const statusResponse: any = await apiClient
    .lookup()
    .eventStatuses();

  statusResponse.forEach((status: any) => {
    statuses.value.push({
      key: status.status_id,
      value: status.name
    })

  });

  calendarOptions.eventContent = renderEventContent as unknown as string;
});

</script>
