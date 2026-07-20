<template>
  <div class="rounded-2xl border border-gray-200 dark:border-gray-800 mb-5" v-for="(Step, StepIndex) in Steps"
    :key="StepIndex">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        <p class="mb-2 font-semibold"> {{ Step.Label }} </p>
        <p class="text-sm text-gray-500 dark:text-gray-400"> {{ Step.StepIcon }} </p>
      </h3>
      <FormFieldsetEditor :FieldSets="Step.Fieldsets" />
    </div>
  </div>

  <div class="flex justify-between px-6 py-5">
    <button @click="AddStep"
      class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
      Add Step
    </button>
  </div>

</template>
<script setup lang="ts">
import { type PropType } from "vue";
import { type IStep } from "@/interfaces/formBuilder";
import FormFieldsetEditor from "./FormFieldsetEditor.vue";

const props = defineProps({
  Steps: {
    type: Object as PropType<IStep[]>,
    required: false,
  },
});

const AddStep = () => {
  const NewStep: IStep = {
    Label: "New Step",
    StepIndex: 0,
    StepIcon: "",
    HasValidationErrors: false,
    Fieldsets: [],
  };
  if (props.Steps) {
    props.Steps.push(NewStep);
  }
  // This is a simplified example - you would need to implement the logic to add a step to a specific page
}

</script>