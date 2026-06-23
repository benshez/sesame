<template>
  <div class="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
    <div class="px-6 py-5">
      <div
        v-if="FormBuilderStore.FormBuilderState.CurrentPage.Steps && FormBuilderStore.FormBuilderState.CurrentPage.Steps.length > 0"
        class="relative flex justify-between w-full">
        <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4"></div>
        <div
          class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 border-b border-gray-200 dark:border-gray-800 transition-all duration-500">
        </div>
        <div v-for="(Step, StepIndex) in FormBuilderStore.FormBuilderState.CurrentPage.Steps" :key="StepIndex" :class="[
          'relative z-10 grid w-10 h-10 font-bold transition-all duration-300 rounded-full border border-gray-200 dark:border-gray-800 place-items-center',
          FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex === StepIndex ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-dark'
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" v-if="Step.StepIcon" aria-hidden="true" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" :d="Step.StepIcon">
            </path>
          </svg>
          <span v-else>{{ StepIndex + 1 }}</span>
          <div class="absolute -bottom-[4.5rem] w-max text-center">
            <h6 :class="[
              'block text-base antialiased leading-relaxed tracking-normal text-gray-700',
              FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex === StepIndex ? 'font-bold' : ''
            ]">
              Step {{ StepIndex + 1 }}
            </h6>
            <p class="block text-base antialiased font-normal leading-relaxed text-gray-700">
              {{ Step.Label }}
            </p>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 dark:border-gray-800 px-6 py-5 rounded-lg mt-22">
        {{ FormBuilderStore.FormBuilderState.CurrentStep }}
        <!-- Form fields for current step -->
      </div>

      <div class="flex justify-between mt-5">
        <button @click="PreviousStep" :disabled="FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex === 0"
          class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Back
        </button>
        <button v-if="FormBuilderStore.FormBuilderState.CurrentPage.Steps"
          @click="NextStep(FormBuilderStore.FormBuilderState.CurrentPage)"
          :disabled="FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex === FormBuilderStore.FormBuilderState.CurrentPage.Steps.length"
          class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          {{ FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex ===
            FormBuilderStore.FormBuilderState.CurrentPage.Steps.length - 1 ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useFormBuilderStore } from "@/store";
import type {
  IPage,
  IStep,
  IElement,
  IKeyValue,
  IValidation,
  IVisibility
} from "@/interfaces/formBuilder";

const FormBuilderStore = useFormBuilderStore();

const NextStep = (CurrentPage: IPage) => {
  FormBuilderStore.NextStep();
}

const PreviousStep = () => {
  FormBuilderStore.PreviousStep();
}

onMounted(async () => {
  await FormBuilderStore.Initialise();
})
</script>
