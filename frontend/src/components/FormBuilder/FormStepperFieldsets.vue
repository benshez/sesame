<template>
  <div class="rounded-2xl border border-gray-200 dark:border-gray-800 mb-5"
    v-for="(Fieldset, FieldsetIndex) in Fieldsets" :key="FieldsetIndex">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        <p class="mb-2 font-semibold"> {{ Fieldset.Label }} </p>
        <p class="text-sm text-gray-500 dark:text-gray-400"> {{ Fieldset.Description }} </p>
      </h3>
    </div>

    <FormStepperElements :-elements="Fieldset.Elements" :-in-valid-items-count="InValidItemsCount" :-layout="Layout" @on-input="OnInput"/>
  </div>
</template>
<script lang="ts" setup>
import type { IFieldset, IElement } from '@/interfaces/formBuilder';
import FormStepperElements from '@/components/FormBuilder/FormStepperElements.vue';

interface Props {
  Fieldsets: Array<IFieldset>;
  StepCount: number;
  InValidItemsCount: number;
  Layout: number
}

const props = defineProps<Props>();
const emit = defineEmits(["onInput"]);

const OnInput = (e: IElement) => {
  emit("onInput", e);
}
</script>