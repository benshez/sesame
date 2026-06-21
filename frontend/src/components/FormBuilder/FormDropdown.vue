<template>
  <FormElement :element="element">
    <template #component>
      <Dropdown v-if="element.component" v-model="element.value" :id="element.id" :options="element.options"
        optionLabel="value" optionValue="key"
        :placeholder="getPlaceholderText(element?.label)" :class="element.cssClass"
        @change="handleInput(page.steps, element)" />
    </template>
  </FormElement>
</template>
<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import FormElement from '~~/components/FormBuilder/components/FormElement.vue'
import { useFormBuilderComponent } from '~~/components/FormBuilder/components/useFormBuilderComponent'
import { ElementProps } from '~~/components/FormBuilder/components/props/Props'

const page = usePage()
const props = defineProps({
  ...ElementProps,
});
const { handleInput } = useFormBuilderComponent()

const getPlaceholderText = (label?: string): string => {
  return `Please select a ${label?.toLocaleLowerCase()}`
}
</script>