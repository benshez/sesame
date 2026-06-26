<template>
  <div class="flex justify-between mt-5">
    <button @click="PreviousStep" :disabled="CurrentPage.CurrentStepIndex === 0"
      class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      {{ PreviousNavigationText }}
    </button>
    <button v-if="CurrentPage.Steps" @click="NextStep"
      :disabled="CurrentPage.CurrentStepIndex === StepCount || HasValidationErrors || false"
      class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      {{ CurrentPage.CurrentStepIndex === StepCount && StepCount - 1 ? 'Submit' : NextNavigationText }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import { FormBuilderProps } from "@/interfaces/formBuilder/IFormBuilderProps";

const props = defineProps(FormBuilderProps);
const emit = defineEmits(["onNextStep", "onPreviousStep"]);

const NextStep = () => {
  emit("onNextStep");
}

const PreviousStep = () => {
  emit("onPreviousStep");
}

</script>