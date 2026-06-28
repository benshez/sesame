<template>
  <div :class="[Layout !== 1 ? 'p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 grid grid-cols-2 gap-4': 'p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 grid']" v-if="Fields">
    <div v-for="(Field, FieldIndex) in Fields" :key="FieldIndex" >
      <FormStepperField :-field="Field" :-has-validation-errors="HasValidationErrors" @on-input="OnInput" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormStepperField from '@/components/FormBuilder/FormStepperField.vue';
import type { IField } from '@/interfaces/formBuilder';
import { FormBuilderProps } from "@/interfaces/formBuilder/IFormBuilderProps";

const props = defineProps(FormBuilderProps);
const emit = defineEmits(["onInput"]);

const OnInput = (e: IField) => {
  emit("onInput", e);
}
</script>