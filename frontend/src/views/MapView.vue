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
          <div class="mb-6 text-center">
            <div class="mt-6">
              <button type="button" @click="saveTrip(elements.elements)"
                class="flex w-full justify-center border p-2 rounded">
                Save Changes
              </button>
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