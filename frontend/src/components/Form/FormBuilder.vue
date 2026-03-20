<template>
  <div v-if="elements && elements?.length > 0">
    <div v-for="(element, elementIndex) in elements" :key="elementIndex">
      <component :is="comp(element)" :element="element" v-if="element.isVisible" v-model="element.value" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import FormInput from "@/components/Form/FormInput.vue";
import FormDropdown from "@/components/Form/FormDropdown.vue"
import type { IElement } from "@/interfaces";

const props = defineProps({
  elements: Array<IElement>
});

const route = useRoute();
const comp = (element: IElement): any => {
  let component = null;
  switch (element.component) {
    case "FormInput":
      component = FormInput;
      break;
    case "FormDropdown": 
      component = FormDropdown;
      break;
  }

  return component;
}


</script>