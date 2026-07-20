<template>
  <div class="rounded-2xl border border-gray-200 dark:border-gray-800 mb-5" v-for="(Fieldset, FieldsetIndex) in FieldSets"
    :key="FieldsetIndex">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        <p class="mb-2 font-semibold"> {{ Fieldset.Label }} </p>
        <p class="text-sm text-gray-500 dark:text-gray-400"> {{ Fieldset.Description }} </p>
      </h3>
      <FieldEditor :Fields="Fieldset.Fields" />
    </div>
  </div>
  <button @click="AddFieldset" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
    Add Fieldset
  </button>
</template>
<script setup lang="ts">
import { type PropType, ref, onMounted } from "vue";
import { type IFieldset } from "@/interfaces/formBuilder";

import FieldEditor from "./FormFieldEditor.vue";

const props = defineProps({
  FieldSets: {
    type: Object as PropType<IFieldset[]>,
    required: false,
  },
});




const AddFieldset = () => {
  const NewFieldset: IFieldset = {
    Label: "New Fieldset",
    Description: "",
    Fields: [],
  };
  if (props.FieldSets) {
    props.FieldSets.push(NewFieldset);
  }
}


</script>