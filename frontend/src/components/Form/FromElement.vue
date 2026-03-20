<template>
  <div class="mb-4" v-if="element.isVisible">
    <slot name="label">
      <label :for="element.id" v-if="element.label"><i v-if="element.labelIcon !== ''"  :class="element.labelIcon"></i>{{ element.label }}</label>
    </slot>
    <slot name="component">
      <label v-if="element.isReadonly">{{ element.value }}</label>
    </slot>
    <slot name="help">
      <p :id="`${element.id}-help`" v-if="element.helpText && !element.isValid" class="mt-1 text-xs text-fg-danger-strong">{{ element.helpText }}</p>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { ElementProps } from "@/components/Form/props/Props";

const props = defineProps({
  ...ElementProps
})

</script>