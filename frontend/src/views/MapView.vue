<template>
  <BaseLayout>
    <FormTwoColumnLayout :is-left-layout="false">
      <template v-slot:form-body-left>
        <FormBody>
          <template v-slot:header>
            Personal Information
          </template>
          <template v-slot:content></template>
          <template v-slot:footer="elements">
            <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
              <div class="space-y-5">
                <div class="flex items-center gap-5">
                  <button type="button" @click="saveTrip(elements.elements)"
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
                <button 
                v-if="isDrawing && !canClear"
                @click="ToggleDrawingMode"
                type="button" title="month view" aria-pressed="true"
                  class="" :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary fc-button-active': isDrawing && !canClear, 'fc-dayGridMonth-button fc-button fc-button-primary': !isDrawing && !canClear }">Add Markers
                </button>
                <button 
                v-if="!isDrawing && canClear"
                @click="ClearMap"
                type="button" title="week view" aria-pressed="false"
                  :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary fc-button-active': !isDrawing && canClear, 'fc-dayGridMonth-button fc-button fc-button-primary': !isDrawing && !canClear }">Clear Map
                </button>
                <button 
                @click="CalculateDistance"
                type="button" title="day view" aria-pressed="false"
                  :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary fc-button-active': !isDrawing && canClear, 'fc-dayGridMonth-button fc-button fc-button-primary': !isDrawing || !canClear }">Calculate Distance
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
import { DateTime } from "ts-luxon";
import { useMap } from "@/utilities";
import { useEventStore, useFormStore } from "@/store";
import type { IElement, IEvent, IStatus } from "@/interfaces";
import FormBody from "@/components/Form/FormBody.vue";
import FormTwoColumnLayout from "@/layouts/FormTwoColumnLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { ApiClient } from "@/plugins";


const apiClient = new ApiClient();
const eventStore = useEventStore;
const formStore = useFormStore();
const map = useMap();
const isDrawing = ref<boolean>(true);
const canClear = ref<boolean>(false);
const route = useRoute();
const router = useRouter();

const saveTrip = (elements: Array<IElement>) => {

  router.push(`/calendar/${route.params.tenantId}/${route.params.userId}`);
}

const CalculateDistance = () => {
  map.OnCalculateDistanceClick();
}

const ClearMap = () => {
  map.OnClearMapClick();
  isDrawing.value = true;
  canClear.value = false;
}

const ToggleDrawingMode = () => {
  canClear.value = true;
  map.ToggleIsDrawing(isDrawing.value);
  isDrawing.value = false;
}

onMounted(async () => {
  map.MapboxInit();
  await eventStore().GetEvents();
  const event = eventStore().GetEvent(route.params.eventId as string);

  formStore.updateElementState("endDate", { key: "value", value: event.end?.toString().split("T")[0] });
  formStore.updateElementState("startDate", { key: "value", value: event.start?.toString().split("T")[0] });
  formStore.updateElementState("progress", { key: "value", value: event.extendedProps?.calendar});
  formStore.updateElementState("organisation", { key: "value", value: event.organisationId});
})
</script>