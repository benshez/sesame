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
        <div class="map-wrapper">
          <div id="mapContainer" class="map-container"></div>
          <div class="map-overlay">
            <ul class=" flex flex-col gap-2">
              <li v-if="isDrawing && !canClear">
                <button id="replay" @click="ToggleDrawingMode"
                  class="menu-item inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">Creat
                  markers
                </button>
              </li>
              <li v-if="!isDrawing && canClear">
                <button id="clear" @click="ClearMap"
                  class="menu-item inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">Clear
                  map</button>
              </li>
              <li>
                <button id="calc" @click="CalculateDistance"
                  class="menu-item inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">Calculate
                  distance</button>
              </li>
            </ul>
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
import { useFormStore } from "@/store/forms/formStore";
import type { IElement } from "@/interfaces";
import FormBody from "@/components/Form/FormBody.vue";
import FormTwoColumnLayout from "@/layouts/FormTwoColumnLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

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

onMounted(() => {
  map.MapboxInit();
})
</script>