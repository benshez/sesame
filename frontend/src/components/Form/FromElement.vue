<template>
  <div class="mb-4" v-if="element.isVisible">
    <slot name="label">
      <label :for="element.id" v-if="element.label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"> {{ element.label }} </label>
    </slot>
    <slot name="component">
      <label v-if="element.isReadonly">{{ element.value }}</label>
    </slot>
    <slot name="help">
      <p :id="`${element.id}-help`" v-if="element.helpText" :class="validationCssClass(element)"> {{ element.helpText }} </p>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { ElementProps } from "@/components/Form/props/Props";
import type { IElement } from "@/interfaces";

const props = defineProps({
  ...ElementProps
})

const validationCssClass = (element: IElement) => {
  return element.isValid ? "mt-1.5 text-theme-xs text-success-500" : "mt-1.5 text-theme-xs text-error-500";
}

</script>