<template>
  <div v-if="CurrentPage.Steps && StepCount > 1" class="relative flex justify-between w-full mb-22">
    <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4"></div>
    <div
      class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 border-b border-gray-200 dark:border-gray-800 transition-all duration-500">
    </div>
    <div v-for="(Step, StepIndex) in CurrentPage.Steps" :key="StepIndex" :class="[
      'relative z-10 grid w-10 h-10 font-bold transition-all duration-300 rounded-full border border-gray-200 dark:border-gray-800 place-items-center',
      CurrentPage.CurrentStepIndex === StepIndex ? 'bg-blue-600' : 'bg-white dark:bg-gray-dark'
    ]">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" v-if="Step.StepIcon" aria-hidden="true" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" :d="Step.StepIcon">
        </path>
      </svg>
      <span v-else>{{ StepIndex + 1 }}</span>
      <div class="absolute -bottom-[4.5rem] w-max text-center mr-0">
        <h6 :class="[
          'block antialiased leading-relaxed tracking-normal',
          CurrentPage.CurrentStepIndex === StepIndex ? 'font-bold' : ''
        ]">
          Step {{ StepIndex + 1 }}
        </h6>
        <p class="block antialiased font-normal leading-relaxed">
          {{ Step.Label }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormBuilderProps } from "@/interfaces/formBuilder/IFormBuilderProps";

const props = defineProps(FormBuilderProps);

</script>