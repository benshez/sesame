<template>
  <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6" v-if="Elements">
    <div v-for="(Element, ElementIndex) in Elements" :key="ElementIndex">
      <FormStepperElement :-element="Element" :-in-valid-items-count="InValidItemsCount" @on-input="OnInput" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormStepperElement from '@/components/FormBuilder/FormStepperElement.vue';
import type { IElement } from '@/interfaces/formBuilder';

interface Props {
  Elements: Array<IElement>;
  InValidItemsCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["onInput"]);

const OnInput = (e: IElement) => {
  emit("onInput", e);
}
</script>