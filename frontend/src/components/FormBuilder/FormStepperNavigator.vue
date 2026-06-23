<template>
  <div class="flex justify-between mt-5">
    <button @click="PreviousStep" :disabled="CurrentPage.CurrentStepIndex === 0"
      class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      Back
    </button>
    <button v-if="CurrentPage.Steps" @click="NextStep"
      :disabled="CurrentPage.CurrentStepIndex === StepCount || InValidItemsCount > 0"
      class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      {{ CurrentPage.CurrentStepIndex === StepCount - 1 ? 'Submit' : 'Next' }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { IPage } from '@/interfaces/formBuilder';

interface Props {
  CurrentPage: IPage;
  StepCount: number;
  InValidItemsCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["onNextStep", "onPreviousStep"]);

const NextStep = () => {
  emit("onNextStep");
}

const PreviousStep = () => {
  emit("onPreviousStep");
}

</script>