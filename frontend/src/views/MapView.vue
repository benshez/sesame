<template>
  <BaseLayout>
    <FormTwoColumnLayout :is-left-layout="false">
      <template v-slot:form-body-left>
        <FormBody>
          <template v-slot:header>
            Event Information
          </template>
          <template v-slot:content></template>
          <template v-slot:footer="elements">
            <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
              <div class="space-y-5">
                <div class="flex items-center gap-5">
                  <button @click="onDeleteEvent" v-if="eventId !== 'NEW'"
                    class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
                    Delete Event
                  </button>
                  <button type="button" @click="onSaveEvent"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </template>
        </FormBody>
      </template>
      <template v-slot:form-body-right>
        <div class="fc flex flex-col">
          <div class="flex lg:flex-row fc-header-toolbar fc-toolbar fc-toolbar-ltr mb-5">
            <div class="fc-toolbar-chunk">
              <div class="fc-button-group inline-flex">
                <button v-if="!displayStore.displayState.canClearMap" @click="onToggleDrawingMode" type="button"
                  title="month view" aria-pressed="false"
                  :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary fc-button-active': displayStore.displayState.canAddMapMarker, 'fc-dayGridMonth-button fc-button fc-button-primary': !displayStore.displayState.canAddMapMarker }">Add
                  Markers
                </button>
                <button v-if="displayStore.displayState.canClearMap" @click="onClearMap" type="button" title="week view"
                  aria-pressed="false"
                  :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary fc-button-active': displayStore.displayState.canClearMap, 'fc-dayGridMonth-button fc-button fc-button-primary': !displayStore.displayState.canClearMap }">Clear
                  Map
                </button>
                <button @click="CalculateDistance" type="button" title="day view" aria-pressed="false"
                  :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary fc-button-active': displayStore.displayState.canAddMapMarker && displayStore.displayState.canClearMap, 'fc-dayGridMonth-button fc-button fc-button-primary': !displayStore.displayState.canAddMapMarker || !displayStore.displayState.canClearMap }">Calculate
                  Distance
                </button>
              </div>
            </div>
          </div>
          <div class="map-wrapper fc-view-harness fc-view-harness-active">
            <div id="mapContainer" class="map-container border-t border-gray-100 dark:border-gray-800"></div>
          </div>
        </div>
      </template>
    </FormTwoColumnLayout>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMap } from "@/utilities";
import { useEventStore } from "@/store/events/useEventStore";
import { useFormStore } from "@/store/forms/useFormStore";
import { useDisplayStore } from "@/store/display/useDisplayStore";
import type { ICoordinates, IEvent } from "@/interfaces";
import FormBody from "@/components/Form/FormBody.vue";
import FormTwoColumnLayout from "@/layouts/FormTwoColumnLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

const eventStore = useEventStore();
const formStore = useFormStore();
const displayStore = useDisplayStore();
const map = useMap();
const eventId = ref<string>("NEW");
const route = useRoute();
const router = useRouter();

const CurrentEvent: IEvent = {
  id: "",
  title: formStore.getElementValue("description") as string,
  start: formStore.getElementValue("startDate") as unknown as Date,
  end: formStore.getElementValue("endDate") as unknown as Date,
  extendedProps: {
    calendar: formStore.getElementValue("progress") as string,
    organisationId: formStore.getElementValue("organisation") as string,
    locations: map.GetEventCoordinates()
  }
}

const onSaveEvent = async () => {
  CurrentEvent.title = formStore.getElementValue("description") as string,
  CurrentEvent.start = formStore.getElementValue("startDate") as unknown as Date,
  CurrentEvent.end = formStore.getElementValue("endDate") as unknown as Date,
  CurrentEvent.extendedProps = {
    calendar: formStore.getElementValue("progress") as string,
    organisationId: formStore.getElementValue("organisation") as string,
    locations: map.GetEventCoordinates()
  }

  if (eventId.value !== "NEW") {
    await eventStore.UpdateEvent(
      CurrentEvent,
      route.params.tenantId as string
    )
  } else {
    await eventStore.CreateEvent(
      CurrentEvent,
      route.params.tenantId as string
    )
  }

  router.push(`/calendar/${route.params.tenantId}/${route.params.userId}`);
}

const onDeleteEvent = async () => {
  if (eventId.value !== "NEW") {
    await eventStore.DeleteEvent(eventId.value);
  }

  router.push(`/calendar/${route.params.tenantId}/${route.params.userId}`);
}

const CalculateDistance = () => {
  UpdateDisplay(true);
  map.ToggleIsDrawing();
  map.OnCalculateDistanceClick();
}

const UpdateDisplay = (show: boolean) => {
  displayStore.UpdateCanAddMapMarkerState(!show);
  displayStore.UpdateCanClearMap(show);
}

const onClearMap = () => {
  map.OnClearMapClick();
  displayStore.UpdateCanAddMapMarkerState(false);
  map.ToggleIsDrawing();
  UpdateDisplay(false);
}

const onToggleDrawingMode = () => {
  displayStore.UpdateCanClearMap(true);
  displayStore.UpdateCanAddMapMarkerState(true);
  map.ToggleIsDrawing();
}

onMounted(async () => {
  displayStore.UpdateCanAddMapMarkerState(true);
  eventId.value = route.params.eventId.toString().toUpperCase();
  CurrentEvent.id = eventId.value;
  map.MapboxInit();

  if (eventId.value !== "NEW") {
    await eventStore.GetEvents();
    const event = eventStore.GetEventByEventId(eventId.value);

    formStore.updateElementState("endDate", { key: "value", value: event.end?.toString().split(".")[0] as unknown as Date });
    formStore.updateElementState("startDate", { key: "value", value: event.start?.toString().split(".")[0] as unknown as Date  });
    formStore.updateElementState("progress", { key: "value", value: event.extendedProps?.calendar });
    formStore.updateElementState("organisation", { key: "value", value: event.extendedProps?.organisationId });
    formStore.updateElementState("description", { key: "value", value: event.title });
    UpdateDisplay(true);
    map.OnCreateSavedMap(event.extendedProps?.locations as unknown as ICoordinates);
  }
})
</script>