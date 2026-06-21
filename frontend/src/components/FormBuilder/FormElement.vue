<template>
  <div class="w-full" v-if="element.visible">
    <slot name="label">
      <label :for="element.id" v-if="element.label" class="inline-block mb-3">{{ element.label }}</label>
    </slot>
    <slot name="component">
      <div v-if="element.readonly" class="w-full">{{ element.value }}</div>
    </slot>
    <slot name="help">
      <small :id="`${element.id}-help`" v-if="element.helpText" class="inline-block mt-3">{{ element.helpText }}</small>
    </slot>    
  </div>
</template>
<script lang="ts" setup>
import { ElementProps } from '~~/components/FormBuilder/components/props/Props'

const props = defineProps({
  ...ElementProps
});
</script>