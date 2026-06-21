<template>
  <FormElement :element="element">
    <template #component>
      <div class="field-checkbox" v-for="(option, index) in element.options" :key="option.key">
        <Checkbox v-if="element.component" v-model="element.value" 
        :id="option.key" 
        :input-id="`${element.id}_checkbox_option_${index}`"
        :value="option.key" @input="handleInput(page.steps, element)" />
        <label :for="`${element.id}_checkbox_option_${index}`">{{ option.value }}</label>
      </div>
    </template>
    <template #help>
      <small :id="`${element.id}-help`" v-if="element.helpText" class="inline-block">{{ element.helpText }}</small>
    </template>
  </FormElement>
</template>
<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'
import FormElement from '~~/components/FormBuilder/components/FormElement.vue'
import { useFormBuilderComponent } from '~~/components/FormBuilder/components/useFormBuilderComponent'
import { ElementProps } from '~~/components/FormBuilder/components/props/Props'

const page = usePage()
const props = defineProps({
  ...ElementProps,
});
const { handleInput } = useFormBuilderComponent()
</script>