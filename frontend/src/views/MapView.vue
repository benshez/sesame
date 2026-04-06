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
      <div id="mapContainer" class="map-container"></div>
    </template>
  </FormTwoColumnLayout>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMap } from "@/utilities";
import { useFormStore } from "@/store/forms/formStore";
import type { IElement } from "@/interfaces";
import FormBody from "@/components/Form/FormBody.vue";
import FormTwoColumnLayout from "@/layouts/FormTwoColumnLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

const formStore = useFormStore();

const saveTrip = (elements: Array<IElement>) => {

}

onMounted(() => {
  const map = useMap()
  map.MapboxInit();
})
</script>